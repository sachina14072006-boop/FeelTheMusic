const pool = require("../config/db");

exports.getAllSongs = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT s.song_id, s.title, s.duration, s.release_date, s.genre,
             s.album_name, s.cover_url, s.song_url,
             a.stage_name AS artist_name
      FROM songs s
      LEFT JOIN artists a ON s.artist_id = a.artist_id
      ORDER BY s.song_id ASC
    `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch songs", error: error.message });
    }
};

exports.getFirstSong = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT s.song_id, s.title, s.duration, s.release_date, s.genre,
             s.album_name, s.cover_url, s.song_url,
             a.stage_name AS artist_name
      FROM songs s
      LEFT JOIN artists a ON s.artist_id = a.artist_id
      ORDER BY s.song_id ASC
      LIMIT 1
    `);

        res.json(rows[0] || null);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch first song", error: error.message });
    }
};

exports.getLastSong = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT s.song_id, s.title, s.duration, s.release_date, s.genre,
             s.album_name, s.cover_url, s.song_url,
             a.stage_name AS artist_name
      FROM songs s
      LEFT JOIN artists a ON s.artist_id = a.artist_id
      ORDER BY s.song_id DESC
      LIMIT 1
    `);

        res.json(rows[0] || null);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch last song", error: error.message });
    }
};

exports.searchSongs = async (req, res) => {
    try {
        const { title = "", genre = "" } = req.query;

        const [rows] = await pool.query(`
      SELECT s.song_id, s.title, s.duration, s.release_date, s.genre,
             s.album_name, s.cover_url, s.song_url,
             a.stage_name AS artist_name
      FROM songs s
      LEFT JOIN artists a ON s.artist_id = a.artist_id
      WHERE s.title LIKE ? AND s.genre LIKE ?
      ORDER BY s.song_id ASC
    `, [`%${title}%`, `%${genre}%`]);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Search failed", error: error.message });
    }
};

exports.getRecommendationsByEmotion = async (req, res) => {
    try {
        const { emotionId } = req.params;

        const [rows] = await pool.query(`
      SELECT s.song_id, s.title, s.genre, s.album_name, s.cover_url, s.song_url,
             a.stage_name AS artist_name,
             e.label AS emotion_label,
             se.relevance_score
      FROM song_emotions se
      JOIN songs s ON se.song_id = s.song_id
      LEFT JOIN artists a ON s.artist_id = a.artist_id
      JOIN emotions e ON se.emotion_id = e.emotion_id
      WHERE se.emotion_id = ?
      ORDER BY se.relevance_score DESC, s.title ASC
    `, [emotionId]);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch recommendations", error: error.message });
    }
};