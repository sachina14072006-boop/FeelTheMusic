const express = require("express");
const router = express.Router();
const { addOrUpdateRating, getRatingsByUser } = require("../controllers/ratingController");

router.post("/", addOrUpdateRating);
router.get("/user/:userId", getRatingsByUser);

module.exports = router;