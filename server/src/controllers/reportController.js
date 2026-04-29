const pool = require("../config/db");

exports.getSongCount = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT COUNT(*) AS total_songs FROM songs`
        );
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch song count", error: error.message });
    }
};

exports.getRatingsSummary = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT rating_value, COUNT(*) AS total
       FROM user_ratings
       GROUP BY rating_value`
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch ratings summary", error: error.message });
    }
};

exports.getPlaylistSongDetails = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT p.playlist_name, p.is_public,
              s.title, s.genre,
              a.stage_name AS artist_name,
              pi.track_order
       FROM playlist_items pi
       JOIN playlists p ON pi.playlist_id = p.playlist_id
       JOIN songs s ON pi.song_id = s.song_id
       LEFT JOIN artists a ON s.artist_id = a.artist_id
       ORDER BY p.playlist_id ASC, pi.track_order ASC`
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch playlist-song details", error: error.message });
    }
};

exports.getPublicPlaylists = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT p.playlist_id, p.playlist_name, p.creation_date,
              u.first_name, u.last_name
       FROM playlists p
       JOIN users u ON p.user_id = u.user_id
       WHERE p.is_public = TRUE
       ORDER BY p.creation_date DESC`
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch public playlists", error: error.message });
    }
};

exports.getMoodHistorySummary = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT e.label AS emotion_label, COUNT(*) AS total_logs
       FROM mood_logs ml
       JOIN emotions e ON ml.emotion_id = e.emotion_id
       GROUP BY e.label
       ORDER BY total_logs DESC`
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch mood history summary", error: error.message });
    }
};