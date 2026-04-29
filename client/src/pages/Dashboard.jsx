import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import PageShell from "../components/PageShell";

function Dashboard() {
    const [songCount, setSongCount] = useState(0);
    const [ratingsSummary, setRatingsSummary] = useState([]);
    const [moodSummary, setMoodSummary] = useState([]);
    const user = JSON.parse(localStorage.getItem("user") || "null");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [songRes, ratingRes, moodRes] = await Promise.all([
                api.get("/reports/song-count"),
                api.get("/reports/ratings-summary"),
                api.get("/reports/mood-history-summary")
            ]);

            setSongCount(songRes.data.total_songs);
            setRatingsSummary(ratingRes.data);
            setMoodSummary(moodRes.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PageShell
            title={`Welcome${user?.first_name ? `, ${user.first_name}` : ""}`}
            subtitle="Your emotion-powered music dashboard"
        >
            <div className="grid dashboard-grid">
                <div className="card glass neon-card stat-card">
                    <p className="mini-label">Library</p>
                    <h3>Total Songs</h3>
                    <motion.p
                        className="big-stat"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {songCount}
                    </motion.p>
                </div>

                <div className="card glass neon-card stat-card">
                    <p className="mini-label">Feedback</p>
                    <h3>Ratings Summary</h3>
                    {ratingsSummary.map((r, i) => (
                        <p key={i}>
                            {r.rating_value}: {r.total}
                        </p>
                    ))}
                </div>

                <div className="card glass neon-card stat-card">
                    <p className="mini-label">Emotion Trend</p>
                    <h3>Mood Summary</h3>
                    {moodSummary.slice(0, 4).map((m, i) => (
                        <p key={i}>
                            {m.emotion_label}: {m.total_logs}
                        </p>
                    ))}
                </div>
            </div>
        </PageShell>
    );
}

export default Dashboard;