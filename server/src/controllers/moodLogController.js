const pool = require("../config/db");

exports.createMoodLog = async (req, res) => {
    try {
        const { user_id, emotion_id, detected_confidence, source_device } = req.body;

        if (!user_id || !emotion_id) {
            return res.status(400).json({ message: "user_id and emotion_id are required" });
        }

        const [result] = await pool.query(
            `INSERT INTO mood_logs (user_id, emotion_id, detected_confidence, source_device)
       VALUES (?, ?, ?, ?)`,
            [user_id, emotion_id, detected_confidence || null, source_device || null]
        );

        res.status(201).json({
            message: "Mood log created successfully",
            mood_log_id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create mood log", error: error.message });
    }
};

exports.getMoodLogsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const [rows] = await pool.query(
            `SELECT ml.mood_log_id, ml.user_id, ml.emotion_id, e.label AS emotion_label,
              ml.detected_confidence, ml.source_device, ml.log_timestamp
       FROM mood_logs ml
       JOIN emotions e ON ml.emotion_id = e.emotion_id
       WHERE ml.user_id = ?
       ORDER BY ml.log_timestamp DESC`,
            [userId]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch mood logs", error: error.message });
    }
};