const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const songRoutes = require("./routes/songRoutes");
const emotionRoutes = require("./routes/emotionRoutes");
const moodLogRoutes = require("./routes/moodLogRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "FeelTheMusic backend is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/emotions", emotionRoutes);
app.use("/api/mood-logs", moodLogRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/reports", reportRoutes);

module.exports = app;