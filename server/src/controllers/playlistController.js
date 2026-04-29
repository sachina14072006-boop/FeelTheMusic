const pool = require("../config/db");

exports.createPlaylist = async (req, res) => {
    try {
        const { playlist_name, is_public, user_id } = req.body;

        if (!playlist_name || !user_id) {
            return res.status(400).json({ message: "playlist_name and user_id are required" });
        }

        const [result] = await pool.query(
            `INSERT INTO playlists (playlist_name, creation_date, is_public, user_id)
       VALUES (?, CURDATE(), ?, ?)`,
            [playlist_name, is_public || false, user_id]
        );

        res.status(201).json({
            message: "Playlist created successfully",
            playlist_id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create playlist", error: error.message });
    }
};

exports.getPlaylistsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const [rows] = await pool.query(
            `SELECT playlist_id, playlist_name, creation_date, is_public, user_id
       FROM playlists
       WHERE user_id = ?
       ORDER BY playlist_id DESC`,
            [userId]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch playlists", error: error.message });
    }
};

exports.addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { song_id } = req.body;

        if (!song_id) {
            return res.status(400).json({ message: "song_id is required" });
        }

        const [existingSongs] = await pool.query(
            `SELECT song_id FROM playlist_items
       WHERE playlist_id = ? AND song_id = ?`,
            [playlistId, song_id]
        );

        if (existingSongs.length > 0) {
            return res.status(409).json({ message: "Song already exists in playlist" });
        }

        const [trackRows] = await pool.query(
            `SELECT COALESCE(MAX(track_order), 0) + 1 AS next_order
       FROM playlist_items
       WHERE playlist_id = ?`,
            [playlistId]
        );

        const nextOrder = trackRows[0].next_order;

        const [result] = await pool.query(
            `INSERT INTO playlist_items (playlist_id, song_id, track_order)
       VALUES (?, ?, ?)`,
            [playlistId, song_id, nextOrder]
        );

        res.status(201).json({
            message: "Song added to playlist successfully",
            playlist_item_id: result.insertId,
            track_order: nextOrder
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to add song to playlist", error: error.message });
    }
};

exports.removeSongFromPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.params;

        const [result] = await pool.query(
            `DELETE FROM playlist_items
       WHERE playlist_id = ? AND song_id = ?`,
            [playlistId, songId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Song not found in playlist" });
        }

        res.json({ message: "Song removed from playlist successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to remove song from playlist", error: error.message });
    }
};

exports.getPlaylistDetails = async (req, res) => {
    try {
        const { playlistId } = req.params;

        const [rows] = await pool.query(
            `SELECT p.playlist_id, p.playlist_name, p.is_public,
              pi.track_order, pi.date_added,
              s.song_id, s.title, s.genre, s.album_name, s.cover_url, s.song_url,
              a.stage_name AS artist_name
       FROM playlists p
       JOIN playlist_items pi ON p.playlist_id = pi.playlist_id
       JOIN songs s ON pi.song_id = s.song_id
       LEFT JOIN artists a ON s.artist_id = a.artist_id
       WHERE p.playlist_id = ?
       ORDER BY pi.track_order ASC`,
            [playlistId]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch playlist details", error: error.message });
    }
};