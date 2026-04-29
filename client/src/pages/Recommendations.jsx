import { useEffect, useRef, useState } from "react";
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
    const [currentSongIndex, setCurrentSongIndex] = useState(-1);
    const lastAutoSongIdRef = useRef(null);

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
            setCurrentSongIndex(-1);

            await api.post("/mood-logs", {
                user_id: user.user_id,
                emotion_id: emotionId,
                detected_confidence: confidence,
                source_device: source
            });

            const res = await api.get(`/songs/recommendations/${emotionId}`);
            const recommendedSongs = res.data || [];
            setSongs(recommendedSongs);

            if (recommendedSongs.length > 0) {
                const playableSongs = recommendedSongs.filter((song) => song.song_url);
                const startPool = playableSongs.length > 0 ? playableSongs : recommendedSongs;
                let startSong = startPool[Math.floor(Math.random() * startPool.length)];

                if (startPool.length > 1 && startSong.song_id === lastAutoSongIdRef.current) {
                    const alternatives = startPool.filter(
                        (song) => song.song_id !== lastAutoSongIdRef.current
                    );
                    startSong = alternatives[Math.floor(Math.random() * alternatives.length)];
                }

                const startIndex = recommendedSongs.findIndex(
                    (song) => song.song_id === startSong.song_id
                );

                lastAutoSongIdRef.current = startSong.song_id;
                setCurrentSong(startSong);
                setCurrentSongIndex(startIndex);
            }

            if (recommendedSongs.length === 0) {
                setInfoMessage("No songs found for this emotion.");
            } else {
                setInfoMessage(`Found ${recommendedSongs.length} recommended song(s).`);
            }
        } catch (error) {
            console.error(error);
            setSongs([]);
            setCurrentSong(null);
            setCurrentSongIndex(-1);
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
        const songIndex = songs.findIndex((item) => item.song_id === song.song_id);
        setCurrentSong(song);
        setCurrentSongIndex(songIndex);
    };

    const playSongAtIndex = (index) => {
        if (songs.length === 0) {
            return;
        }

        const normalizedIndex = (index + songs.length) % songs.length;
        setCurrentSong(songs[normalizedIndex]);
        setCurrentSongIndex(normalizedIndex);
    };

    const nextTrack = () => {
        if (songs.length === 0) {
            return;
        }

        playSongAtIndex(currentSongIndex >= 0 ? currentSongIndex + 1 : 0);
    };

    const previousTrack = () => {
        if (songs.length === 0) {
            return;
        }

        playSongAtIndex(currentSongIndex >= 0 ? currentSongIndex - 1 : songs.length - 1);
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

            <MusicPlayer
                currentSong={currentSong}
                onPrevious={previousTrack}
                onNext={nextTrack}
                hasMultipleSongs={songs.length > 1}
            />

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
