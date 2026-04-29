const express = require("express");
const router = express.Router();
const { createMoodLog, getMoodLogsByUser } = require("../controllers/moodLogController");

router.post("/", createMoodLog);
router.get("/user/:userId", getMoodLogsByUser);

module.exports = router;