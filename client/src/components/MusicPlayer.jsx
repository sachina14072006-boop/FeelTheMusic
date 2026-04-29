import { useEffect, useRef, useState } from "react";

function MusicPlayer({ currentSong }) {
    const audioRef = useRef(null);
    const [audioError, setAudioError] = useState("");

    useEffect(() => {
        setAudioError("");

        if (audioRef.current && currentSong && currentSong.song_url) {
            audioRef.current.load();
            audioRef.current.play().catch(() => { });
        }
    }, [currentSong]);

    if (!currentSong) {
        return (
            <div className="card glass">
                <h3>Music Player</h3>
                <p>No song selected.</p>
            </div>
        );
    }

    return (
        <div className="card glass">
            <h3>Music Player</h3>

            <div className="player-info">
                <p><strong>Title:</strong> {currentSong.title}</p>
                <p><strong>Artist:</strong> {currentSong.artist_name || "Unknown"}</p>
                <p><strong>Genre:</strong> {currentSong.genre || "N/A"}</p>
            </div>

            {currentSong.cover_url && (
                <img
                    src={currentSong.cover_url}
                    alt={currentSong.title}
                    className="player-cover"
                />
            )}

            {currentSong.song_url ? (
                <>
                    <audio
                        ref={audioRef}
                        controls
                        className="audio-player"
                        onError={() =>
                            setAudioError("Audio could not be loaded. Check the song file/path.")
                        }
                    >
                        <source src={currentSong.song_url} />
                        Your browser does not support the audio element.
                    </audio>

                    {audioError && <p className="error-text">{audioError}</p>}
                </>
            ) : (
                <p className="error-text">No playable audio file is linked for this song yet.</p>
            )}
        </div>
    );
}

export default MusicPlayer;