import { motion } from "framer-motion";

function SongCard({ song, onLike, onDislike, onAddToPlaylist, onPlay, isActive }) {
    const hasPlayableUrl = !!song.song_url;

    return (
        <motion.div
            className={`card ${isActive ? "active-song" : ""}`}
            whileHover={{ scale: 1.04 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* 🎵 Cover Image */}
            {song.cover_url && (
                <img
                    src={song.cover_url}
                    alt={song.title}
                    className="song-cover"
                />
            )}

            <h3>{song.title}</h3>

            <p><strong>Artist:</strong> {song.artist_name || "Unknown"}</p>
            <p><strong>Genre:</strong> {song.genre || "N/A"}</p>
            <p><strong>Album:</strong> {song.album_name || "N/A"}</p>

            {/* ❌ OPTIONAL (you can remove if not needed in UI) */}
            {/* <p><strong>Song ID:</strong> {song.song_id}</p> */}

            {song.song_url ? (
                <p><strong>Status:</strong> Playable</p>
            ) : (
                <p className="error-text"><strong>Status:</strong> Audio not added yet</p>
            )}

            <div className="card-actions">
                {onPlay && (
                    <button onClick={() => onPlay(song)} disabled={!hasPlayableUrl}>
                        ▶ Play
                    </button>
                )}

                {onLike && <button onClick={() => onLike(song.song_id)}>👍 Like</button>}
                {onDislike && <button onClick={() => onDislike(song.song_id)}>👎 Dislike</button>}

                {onAddToPlaylist && (
                    <button onClick={() => onAddToPlaylist(song.song_id)}>
                        ➕ Playlist
                    </button>
                )}
            </div>
        </motion.div>
    );
}

export default SongCard;