import { useEffect, useState } from "react";
import api from "../services/api";
import SongCard from "../components/SongCard";
import MusicPlayer from "../components/MusicPlayer";
import PageShell from "../components/PageShell";

function Songs() {
    const [songs, setSongs] = useState([]);
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [currentSong, setCurrentSong] = useState(null);

    const user = JSON.parse(localStorage.getItem("user") || "null");

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        try {
            const res = await api.get("/songs");
            setSongs(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const searchSongs = async () => {
        try {
            const res = await api.get(`/songs/search?title=${title}&genre=${genre}`);
            setSongs(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getFirstSong = async () => {
        try {
            const res = await api.get("/songs/first");
            setSongs(res.data ? [res.data] : []);
        } catch (error) {
            console.error(error);
        }
    };

    const getLastSong = async () => {
        try {
            const res = await api.get("/songs/last");
            setSongs(res.data ? [res.data] : []);
        } catch (error) {
            console.error(error);
        }
    };

    const rateSong = async (songId, value) => {
        try {
            if (!user) {
                alert("Please login first");
                return;
            }

            await api.post("/ratings", {
                user_id: user.user_id,
                song_id: songId,
                rating_value: value
            });

            alert(`Song marked as ${value}`);
        } catch (error) {
            console.error(error);
            alert("Failed to rate song");
        }
    };

    const handlePlaySong = (song) => {
        setCurrentSong(song);
    };

    return (
        <PageShell
            title="Songs Library"
            subtitle="Browse, search, rate, and play your curated song collection"
        >
            <div className="card glass">
                <div className="toolbar">
                    <input
                        placeholder="Search by title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        placeholder="Filter by genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                    <button onClick={searchSongs}>Search</button>
                    <button onClick={fetchSongs}>All</button>
                    <button onClick={getFirstSong}>First Record</button>
                    <button onClick={getLastSong}>Last Record</button>
                </div>
            </div>

            <MusicPlayer currentSong={currentSong} />

            <div className="grid">
                {songs.map((song) => (
                    <SongCard
                        key={song.song_id}
                        song={song}
                        onPlay={handlePlaySong}
                        onLike={(id) => rateSong(id, "like")}
                        onDislike={(id) => rateSong(id, "dislike")}
                        isActive={currentSong?.song_id === song.song_id}
                    />
                ))}
            </div>
        </PageShell>
    );
}

export default Songs;