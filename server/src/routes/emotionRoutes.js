const express = require("express");
const router = express.Router();
const { getAllEmotions } = require("../controllers/emotionController");

router.get("/", getAllEmotions);

module.exports = router;