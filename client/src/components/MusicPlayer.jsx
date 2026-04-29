import { useEffect, useRef, useState } from "react";

function MusicPlayer({ currentSong, onPrevious, onNext, hasMultipleSongs = false }) {
    const audioRef = useRef(null);
    const [audioError, setAudioError] = useState("");

    useEffect(() => {
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
                    <div className="player-controls">
                        <button
                            type="button"
                            onClick={onPrevious}
                            disabled={!hasMultipleSongs}
                            aria-label="Previous track"
                            title="Previous track"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            onClick={onNext}
                            disabled={!hasMultipleSongs}
                            aria-label="Next track"
                            title="Next track"
                        >
                            Next
                        </button>
                    </div>

                    <audio
                        ref={audioRef}
                        controls
                        className="audio-player"
                        onLoadStart={() => setAudioError("")}
                        onEnded={() => {
                            if (hasMultipleSongs) {
                                onNext();
                            }
                        }}
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
