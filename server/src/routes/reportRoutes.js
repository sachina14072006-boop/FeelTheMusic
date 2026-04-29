const express = require("express");
const router = express.Router();
const {
    getSongCount,
    getRatingsSummary,
    getPlaylistSongDetails,
    getPublicPlaylists,
    getMoodHistorySummary
} = require("../controllers/reportController");

router.get("/song-count", getSongCount);
router.get("/ratings-summary", getRatingsSummary);
router.get("/playlist-song-details", getPlaylistSongDetails);
router.get("/public-playlists", getPublicPlaylists);
router.get("/mood-history-summary", getMoodHistorySummary);

module.exports = router;