import { useEffect, useState } from "react";
import api from "../services/api";
import PageShell from "../components/PageShell";

function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
    const [songId, setSongId] = useState("");
    const [playlistDetails, setPlaylistDetails] = useState([]);

    const user = JSON.parse(localStorage.getItem("user") || "null");

    useEffect(() => {
        if (user) {
            fetchPlaylists();
        }
    }, []);

    const fetchPlaylists = async () => {
        try {
            const res = await api.get(`/playlists/user/${user.user_id}`);
            setPlaylists(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createPlaylist = async () => {
        try {
            await api.post("/playlists", {
                playlist_name: playlistName,
                is_public: isPublic,
                user_id: user.user_id
            });
            setPlaylistName("");
            setIsPublic(false);
            fetchPlaylists();
        } catch (error) {
            alert("Failed to create playlist");
        }
    };

    const addSong = async () => {
        if (!selectedPlaylistId || !songId) return;

        try {
            await api.post(`/playlists/${selectedPlaylistId}/items`, {
                song_id: Number(songId)
            });
            alert("Song added");
            loadPlaylistDetails(selectedPlaylistId);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to add song");
        }
    };

    const loadPlaylistDetails = async (playlistId) => {
        try {
            setSelectedPlaylistId(playlistId);
            const res = await api.get(`/playlists/${playlistId}`);
            setPlaylistDetails(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const removeSong = async (playlistId, songId) => {
        try {
            await api.delete(`/playlists/${playlistId}/items/${songId}`);
            loadPlaylistDetails(playlistId);
        } catch (error) {
            alert("Failed to remove song");
        }
    };

    if (!user) {
        return (
            <PageShell
                title="Playlist Studio"
                subtitle="Create, manage, and organize your personal playlists"
            >
                <div className="card glass">
                    <p>Please login first.</p>
                </div>
            </PageShell>
        );
    }

    return (
        <PageShell
            title="Playlist Studio"
            subtitle="Create, manage, and organize your personal playlists"
        >
            <div className="card glass">
                <h3>Create Playlist</h3>
                <div className="toolbar">
                    <input
                        placeholder="Playlist name"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />
                    <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                            style={{ width: "18px" }}
                        />
                        Public
                    </label>
                    <button onClick={createPlaylist}>Create</button>
                </div>
            </div>

            <div className="grid">
                {playlists.map((playlist) => (
                    <div className="card glass neon-card" key={playlist.playlist_id}>
                        <h3>{playlist.playlist_name}</h3>
                        <p>Public: {playlist.is_public ? "Yes" : "No"}</p>
                        <button onClick={() => loadPlaylistDetails(playlist.playlist_id)}>
                            View Songs
                        </button>
                    </div>
                ))}
            </div>

            <div className="card glass">
                <h3>Add Song to Selected Playlist</h3>
                <div className="toolbar">
                    <input
                        placeholder="Song ID"
                        value={songId}
                        onChange={(e) => setSongId(e.target.value)}
                    />
                    <button onClick={addSong}>Add Song</button>
                </div>
            </div>

            <div className="card glass">
                <h3>Playlist Details</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Track Order</th>
                            <th>Song</th>
                            <th>Artist</th>
                            <th>Genre</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlistDetails.map((item) => (
                            <tr key={`${item.playlist_id}-${item.song_id}`}>
                                <td>{item.track_order}</td>
                                <td>{item.title}</td>
                                <td>{item.artist_name}</td>
                                <td>{item.genre}</td>
                                <td>
                                    <button onClick={() => removeSong(item.playlist_id, item.song_id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PageShell>
    );
}

export default Playlists;