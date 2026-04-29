import { useEffect, useRef, useState } from "react";
import axios from "axios";

function WebcamDetector({ onEmotionDetected }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const [cameraOn, setCameraOn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [detected, setDetected] = useState(null);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("OFF");

    const startCamera = async () => {
        try {
            setError("");
            setDetected(null);

            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            });

            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            setCameraOn(true);
            setStatus("LIVE");
        } catch (err) {
            setError("Unable to access webcam. Please allow camera permission.");
            setStatus("OFF");
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        setCameraOn(false);
        setStatus("OFF");
    };

    const captureAndDetect = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        try {
            setLoading(true);
            setError("");
            setDetected(null);
            setStatus("PROCESSING");

            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;

            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageBase64 = canvas.toDataURL("image/jpeg");

            const emotionApiUrl = import.meta.env.VITE_EMOTION_API_URL || "http://localhost:8000";

            const res = await axios.post(`${emotionApiUrl}/detect-emotion`, {
                image: imageBase64
            });

            if (res.data.success) {
                setDetected(res.data);
                setStatus("LIVE");

                if (onEmotionDetected) {
                    onEmotionDetected(res.data);
                }
            } else {
                setError(res.data.message || "Emotion detection failed");
                setStatus("LIVE");
            }
        } catch (err) {
            setError("Failed to detect emotion. Please try again.");
            setStatus("LIVE");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <div className="card glass webcam-card">
            <h3>Webcam Emotion Detection</h3>

            <div className={`status-badge ${status.toLowerCase()}`}>
                {status}
            </div>

            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="webcam-video"
            />

            <canvas ref={canvasRef} style={{ display: "none" }} />

            <div className="card-actions">
                {!cameraOn && <button onClick={startCamera}>Start Camera</button>}
                {cameraOn && <button onClick={captureAndDetect}>Detect Emotion</button>}
                {cameraOn && <button onClick={stopCamera}>Stop Camera</button>}
            </div>

            {loading && <p className="loading shimmer-box">Detecting emotion...</p>}
            {error && <p className="error-text">{error}</p>}

            {detected && (
                <div className="result-box">
                    <p><strong>Raw Emotion:</strong> {detected.raw_emotion}</p>
                    <p><strong>Mapped Emotion:</strong> {detected.mapped_emotion}</p>
                    <p><strong>Confidence:</strong> {detected.confidence}%</p>
                </div>
            )}
        </div>
    );
}

export default WebcamDetector;
