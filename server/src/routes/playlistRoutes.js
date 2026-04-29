const express = require("express");
const router = express.Router();
const {
    createPlaylist,
    getPlaylistsByUser,
    addSongToPlaylist,
    removeSongFromPlaylist,
    getPlaylistDetails
} = require("../controllers/playlistController");

router.post("/", createPlaylist);
router.get("/user/:userId", getPlaylistsByUser);
router.get("/:playlistId", getPlaylistDetails);
router.post("/:playlistId/items", addSongToPlaylist);
router.delete("/:playlistId/items/:songId", removeSongFromPlaylist);

module.exports = router;