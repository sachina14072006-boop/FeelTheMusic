import { useEffect, useState } from "react";
import api from "../services/api";
import PageShell from "../components/PageShell";

function Reports() {
    const [songCount, setSongCount] = useState(null);
    const [ratingsSummary, setRatingsSummary] = useState([]);
    const [playlistSongDetails, setPlaylistSongDetails] = useState([]);
    const [publicPlaylists, setPublicPlaylists] = useState([]);
    const [moodSummary, setMoodSummary] = useState([]);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const [
                songCountRes,
                ratingsRes,
                playlistRes,
                publicPlaylistRes,
                moodRes
            ] = await Promise.all([
                api.get("/reports/song-count"),
                api.get("/reports/ratings-summary"),
                api.get("/reports/playlist-song-details"),
                api.get("/reports/public-playlists"),
                api.get("/reports/mood-history-summary")
            ]);

            setSongCount(songCountRes.data.total_songs);
            setRatingsSummary(ratingsRes.data);
            setPlaylistSongDetails(playlistRes.data);
            setPublicPlaylists(publicPlaylistRes.data);
            setMoodSummary(moodRes.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PageShell
            title="Analytics & Reports"
            subtitle="Visualize activity, ratings, playlists, and mood insights"
        >
            <div className="grid">
                <div className="card glass neon-card">
                    <h3>Total Songs</h3>
                    <p className="big-stat">{songCount}</p>
                </div>

                <div className="card glass neon-card">
                    <h3>Ratings Summary</h3>
                    {ratingsSummary.map((item, i) => (
                        <p key={i}>
                            {item.rating_value}: {item.total}
                        </p>
                    ))}
                </div>

                <div className="card glass neon-card">
                    <h3>Mood History Summary</h3>
                    {moodSummary.map((item, i) => (
                        <p key={i}>
                            {item.emotion_label}: {item.total_logs}
                        </p>
                    ))}
                </div>
            </div>

            <div className="card glass">
                <h3>Public Playlists</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Playlist</th>
                            <th>Owner</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publicPlaylists.map((p) => (
                            <tr key={p.playlist_id}>
                                <td>{p.playlist_id}</td>
                                <td>{p.playlist_name}</td>
                                <td>
                                    {p.first_name} {p.last_name}
                                </td>
                                <td>{p.creation_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="card glass">
                <h3>Playlist Song Details</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Playlist</th>
                            <th>Song</th>
                            <th>Artist</th>
                            <th>Genre</th>
                            <th>Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlistSongDetails.map((item, i) => (
                            <tr key={i}>
                                <td>{item.playlist_name}</td>
                                <td>{item.title}</td>
                                <td>{item.artist_name}</td>
                                <td>{item.genre}</td>
                                <td>{item.track_order}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PageShell>
    );
}

export default Reports;