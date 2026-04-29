import { useEffect, useState } from "react";
import api from "../services/api";
import PageShell from "../components/PageShell";

function MoodLogs() {
    const [logs, setLogs] = useState([]);
    const user = JSON.parse(localStorage.getItem("user") || "null");

    useEffect(() => {
        if (user) {
            fetchLogs();
        }
    }, []);

    const fetchLogs = async () => {
        try {
            const res = await api.get(`/mood-logs/user/${user.user_id}`);
            setLogs(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!user) {
        return (
            <PageShell
                title="Mood History"
                subtitle="Track your detected and selected emotion sessions"
            >
                <div className="card glass">
                    <p>Please login first.</p>
                </div>
            </PageShell>
        );
    }

    return (
        <PageShell
            title="Mood History"
            subtitle="Track your detected and selected emotion sessions"
        >
            <div className="card glass">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Emotion</th>
                            <th>Confidence</th>
                            <th>Source</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.mood_log_id}>
                                <td>{log.mood_log_id}</td>
                                <td>{log.emotion_label}</td>
                                <td>{log.detected_confidence}</td>
                                <td>{log.source_device}</td>
                                <td>{new Date(log.log_timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PageShell>
    );
}

export default MoodLogs;