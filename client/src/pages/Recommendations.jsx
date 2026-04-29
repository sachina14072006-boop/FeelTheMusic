import { useEffect, useState } from "react";
import api from "../services/api";
import SongCard from "../components/SongCard";
import WebcamDetector from "../components/WebcamDetector";
import MusicPlayer from "../components/MusicPlayer";
import PageShell from "../components/PageShell";

function Recommendations() {
    const [emotions, setEmotions] = useState([]);
    const [selectedEmotion, setSelectedEmotion] = useState("");
    const [songs, setSongs] = useState([]);
    const [detectedResult, setDetectedResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [currentSong, setCurrentSong] = useState(null);

    const user = JSON.parse(localStorage.getItem("user") || "null");

    useEffect(() => {
        loadEmotions();
    }, []);

    const loadEmotions = async () => {
        try {
            const res = await api.get("/emotions");
            setEmotions(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const findEmotionIdByLabel = (label) => {
        const found = emotions.find(
            (emotion) => emotion.label.toLowerCase() === label.toLowerCase()
        );
        return found ? found.emotion_id : null;
    };

    const fetchRecommendations = async (emotionId, confidence = 90, source = "Web App") => {
        try {
            if (!user) {
                setInfoMessage("Please login first.");
                return;
            }

            setLoading(true);
            setInfoMessage("");
            setSongs([]);
            setCurrentSong(null);

            await api.post("/mood-logs", {
                user_id: user.user_id,
                emotion_id: emotionId,
                detected_confidence: confidence,
                source_device: source
            });

            const res = await api.get(`/songs/recommendations/${emotionId}`);
            setSongs(res.data);

            if (res.data.length > 0) {
                setCurrentSong(res.data[0]);
            }

            if (res.data.length === 0) {
                setInfoMessage("No songs found for this emotion.");
            } else {
                setInfoMessage(`Found ${res.data.length} recommended song(s).`);
            }
        } catch (error) {
            console.error(error);
            setSongs([]);
            setInfoMessage("Failed to fetch recommendations.");
        } finally {
            setLoading(false);
        }
    };

    const handleManualRecommendations = async () => {
        if (!selectedEmotion) {
            setInfoMessage("Please select an emotion first.");
            return;
        }

        const selected = emotions.find(
            (emotion) => String(emotion.emotion_id) === String(selectedEmotion)
        );

        setDetectedResult(
            selected
                ? {
                    mapped_emotion: selected.label,
                    confidence: 90
                }
                : null
        );

        await fetchRecommendations(Number(selectedEmotion), 90, "Manual Selection");
    };

    const handleEmotionDetected = async (result) => {
        setDetectedResult(result);

        const emotionId = findEmotionIdByLabel(result.mapped_emotion);

        if (!emotionId) {
            setInfoMessage("Mapped emotion was not found in the database.");
            return;
        }

        setSelectedEmotion(String(emotionId));
        await fetchRecommendations(emotionId, result.confidence, "Webcam");
    };

    const handlePlaySong = (song) => {
        setCurrentSong(song);
    };

    if (!user) {
        return (
            <PageShell
                title="Smart Recommendations"
                subtitle="Detect your mood, match your vibe, and play instantly"
            >
                <div className="card glass">
                    <p>Please login first.</p>
                </div>
            </PageShell>
        );
    }

    return (
        <PageShell
            title="Smart Recommendations"
            subtitle="Detect your mood, match your vibe, and play instantly"
        >
            <WebcamDetector onEmotionDetected={handleEmotionDetected} />

            <div className="card glass">
                <h3>Manual Emotion Selection</h3>
                <div className="toolbar">
                    <select
                        value={selectedEmotion}
                        onChange={(e) => setSelectedEmotion(e.target.value)}
                    >
                        <option value="">Select Emotion</option>
                        {emotions.map((emotion) => (
                            <option key={emotion.emotion_id} value={emotion.emotion_id}>
                                {emotion.label}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleManualRecommendations}>
                        Get Recommendations
                    </button>
                </div>

                {detectedResult && (
                    <div className="result-box">
                        <p>
                            <strong>Current Emotion:</strong> {detectedResult.mapped_emotion}
                        </p>
                        <p>
                            <strong>Confidence:</strong> {detectedResult.confidence}%
                        </p>
                    </div>
                )}

                {loading && <p className="loading shimmer-box">Loading recommendations...</p>}
                {infoMessage && <p>{infoMessage}</p>}
            </div>

            <MusicPlayer currentSong={currentSong} />

            <div className="grid">
                {songs.map((song) => (
                    <SongCard
                        key={song.song_id}
                        song={song}
                        onPlay={handlePlaySong}
                        isActive={currentSong?.song_id === song.song_id}
                    />
                ))}
            </div>
        </PageShell>
    );
}

export default Recommendations;