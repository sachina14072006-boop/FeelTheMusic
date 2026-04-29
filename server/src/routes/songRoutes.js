const express = require("express");
const router = express.Router();
const {
    getAllSongs,
    getFirstSong,
    getLastSong,
    searchSongs,
    getRecommendationsByEmotion
} = require("../controllers/songController");

router.get("/", getAllSongs);
router.get("/first", getFirstSong);
router.get("/last", getLastSong);
router.get("/search", searchSongs);
router.get("/recommendations/:emotionId", getRecommendationsByEmotion);

module.exports = router;