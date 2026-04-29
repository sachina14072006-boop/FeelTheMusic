const pool = require("../config/db");

exports.addOrUpdateRating = async (req, res) => {
    try {
        const { user_id, song_id, rating_value } = req.body;

        if (!user_id || !song_id || !rating_value) {
            return res.status(400).json({ message: "user_id, song_id and rating_value are required" });
        }

        if (!["like", "dislike"].includes(rating_value)) {
            return res.status(400).json({ message: "rating_value must be like or dislike" });
        }

        await pool.query(
            `INSERT INTO user_ratings (user_id, song_id, rating_value)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE
       rating_value = VALUES(rating_value),
       rate_date = CURRENT_TIMESTAMP`,
            [user_id, song_id, rating_value]
        );

        res.json({ message: "Rating saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to save rating", error: error.message });
    }
};

exports.getRatingsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const [rows] = await pool.query(
            `SELECT ur.rating_id, ur.user_id, ur.song_id, ur.rating_value, ur.rate_date,
              s.title, a.stage_name AS artist_name
       FROM user_ratings ur
       JOIN songs s ON ur.song_id = s.song_id
       LEFT JOIN artists a ON s.artist_id = a.artist_id
       WHERE ur.user_id = ?
       ORDER BY ur.rate_date DESC`,
            [userId]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch ratings", error: error.message });
    }
};