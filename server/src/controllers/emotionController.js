const pool = require("../config/db");

exports.getAllEmotions = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT emotion_id, label, intensity_range
      FROM emotions
      ORDER BY emotion_id ASC
    `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch emotions", error: error.message });
    }
};