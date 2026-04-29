CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS artists (
    artist_id INT AUTO_INCREMENT PRIMARY KEY,
    stage_name VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS emotions (
    emotion_id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(50) NOT NULL UNIQUE,
    intensity_range VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS songs (
    song_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    duration VARCHAR(20),
    release_date DATE,
    genre VARCHAR(100),
    album_name VARCHAR(255),
    cover_url VARCHAR(500),
    song_url VARCHAR(500),
    artist_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_songs_artist
        FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
        ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS song_emotions (
    song_id INT NOT NULL,
    emotion_id INT NOT NULL,
    relevance_score DECIMAL(5,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (song_id, emotion_id),
    CONSTRAINT fk_song_emotions_song
        FOREIGN KEY (song_id) REFERENCES songs(song_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_song_emotions_emotion
        FOREIGN KEY (emotion_id) REFERENCES emotions(emotion_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mood_logs (
    mood_log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    emotion_id INT NOT NULL,
    detected_confidence DECIMAL(5,2),
    source_device VARCHAR(100),
    log_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mood_logs_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_mood_logs_emotion
        FOREIGN KEY (emotion_id) REFERENCES emotions(emotion_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS playlists (
    playlist_id INT AUTO_INCREMENT PRIMARY KEY,
    playlist_name VARCHAR(255) NOT NULL,
    creation_date DATE NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    user_id INT NOT NULL,
    CONSTRAINT fk_playlists_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS playlist_items (
    playlist_item_id INT AUTO_INCREMENT PRIMARY KEY,
    playlist_id INT NOT NULL,
    song_id INT NOT NULL,
    track_order INT NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_playlist_song (playlist_id, song_id),
    CONSTRAINT fk_playlist_items_playlist
        FOREIGN KEY (playlist_id) REFERENCES playlists(playlist_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_playlist_items_song
        FOREIGN KEY (song_id) REFERENCES songs(song_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    song_id INT NOT NULL,
    rating_value ENUM('like', 'dislike') NOT NULL,
    rate_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_user_song_rating (user_id, song_id),
    CONSTRAINT fk_user_ratings_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user_ratings_song
        FOREIGN KEY (song_id) REFERENCES songs(song_id)
        ON DELETE CASCADE
);
