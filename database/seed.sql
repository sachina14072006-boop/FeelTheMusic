INSERT INTO emotions (label, intensity_range) VALUES
    ('Happy', '70-100'),
    ('Sad', '50-100'),
    ('Calm', '40-90'),
    ('Energetic', '60-100')
ON DUPLICATE KEY UPDATE
    intensity_range = VALUES(intensity_range);

INSERT INTO artists (stage_name) VALUES
    ('Anirudh Ravichander'),
    ('Arijit Singh'),
    ('A. R. Rahman'),
    ('Benson Boone'),
    ('AP Dhillon'),
    ('Various Artists')
ON DUPLICATE KEY UPDATE
    stage_name = VALUES(stage_name);

INSERT INTO songs (title, duration, release_date, genre, album_name, cover_url, song_url, artist_id) VALUES
    ('Adiyae', '4:32', '2013-08-30', 'Romantic', 'Kadal', '/covers/adiyae.jpg', '/audio/adiyae.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'A. R. Rahman')),
    ('Agar Tum Mil Jao', '5:59', '2005-09-02', 'Romantic', 'Zeher', '/covers/agartummiljao.jpg', '/audio/agartummiljao.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Various Artists')),
    ('Akhiyaan Gulaab', '2:51', '2024-02-09', 'Pop', 'Teri Baaton Mein Aisa Uljha Jiya', '/covers/akhiyaangulaab.jpg', '/audio/akhiyaangulaab.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Various Artists')),
    ('Beautiful Things', '3:00', '2024-01-18', 'Pop', 'Beautiful Things', '/covers/beautifulthings.jpg', '/audio/beautifulthings.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Benson Boone')),
    ('Cold Mess', '3:14', '2018-11-16', 'Indie', 'Cold Mess', '/covers/coldmess.jpg', '/audio/coldmess.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'AP Dhillon')),
    ('Hayyoda', '3:20', '2023-08-14', 'Romantic', 'Jawan', '/covers/hayyoda.jpg', '/audio/hayyoda.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Anirudh Ravichander')),
    ('Husn', '3:37', '2023-12-01', 'Indie', 'Husn', '/covers/husn.jpg', '/audio/husn.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Various Artists')),
    ('Ilahi', '3:48', '2013-03-29', 'Travel', 'Yeh Jawaani Hai Deewani', '/covers/ilahi.jpg', '/audio/ilahi.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Arijit Singh')),
    ('Kaavaalaa', '3:10', '2023-07-06', 'Dance', 'Jailer', '/covers/kaavaalaa.jpg', '/audio/kaavaalaa.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Anirudh Ravichander')),
    ('Kasoor', '3:17', '2020-07-09', 'Indie', 'Kasoor', '/covers/kasoor.jpg', '/audio/kasoor.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Various Artists')),
    ('Kesariya', '4:28', '2022-07-17', 'Romantic', 'Brahmastra', '/covers/kesariya.jpg', '/audio/kesariya.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Arijit Singh')),
    ('Kolaveri', '4:08', '2011-11-16', 'Fun', '3', '/covers/kolaveri.jpg', '/audio/kolaveri.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Anirudh Ravichander')),
    ('Kun Faya Kun', '7:51', '2011-09-30', 'Sufi', 'Rockstar', '/covers/kunfaayakun.jpg', '/audio/kunfaayakun.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'A. R. Rahman')),
    ('Lose Control', '3:30', '2023-06-23', 'Pop', 'Lose Control', '/covers/losecontrol.jpg', '/audio/losecontrol.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Various Artists')),
    ('Mast Magan', '4:40', '2014-03-14', 'Romantic', '2 States', '/covers/mastmagan.jpg', '/audio/mastmagan.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Arijit Singh')),
    ('Vaathi Coming', '3:48', '2020-03-10', 'Dance', 'Master', '/covers/vaathicoming.jpg', '/audio/vaathicoming.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Anirudh Ravichander')),
    ('Unakku Thaan', '3:36', '2023-11-06', 'Melody', 'Chithha', '/covers/unakkuthaan.jpg', '/audio/unakkuthaan.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Various Artists')),
    ('Tum Tak', '5:04', '2013-05-31', 'Romantic', 'Raanjhanaa', '/covers/tumtak.jpg', '/audio/tumtak.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'A. R. Rahman')),
    ('Pehle Bhi Main', '4:10', '2023-11-24', 'Romantic', 'Animal', '/covers/pehlebhimain.jpg', '/audio/pehlebhimain.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Various Artists')),
    ('Ordinary Person', '2:47', '2023-10-19', 'Motivational', 'Leo', '/covers/ordinaryperson.jpg', '/audio/ordinaryperson.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'Anirudh Ravichander')),
    ('Nee Singam Dhan', '4:07', '2023-03-30', 'Motivational', 'Pathu Thala', '/covers/neesingamdhan.jpg', '/audio/neesingamdhan.mp3', (SELECT artist_id FROM artists WHERE stage_name = 'A. R. Rahman'))
ON DUPLICATE KEY UPDATE
    duration = VALUES(duration),
    release_date = VALUES(release_date),
    genre = VALUES(genre),
    album_name = VALUES(album_name),
    cover_url = VALUES(cover_url),
    song_url = VALUES(song_url),
    artist_id = VALUES(artist_id);

INSERT IGNORE INTO song_emotions (song_id, emotion_id, relevance_score)
SELECT s.song_id, e.emotion_id, 95.00
FROM songs s
JOIN emotions e ON e.label = 'Happy'
WHERE s.title IN ('Akhiyaan Gulaab', 'Ilahi', 'Kaavaalaa', 'Kolaveri', 'Vaathi Coming');

INSERT IGNORE INTO song_emotions (song_id, emotion_id, relevance_score)
SELECT s.song_id, e.emotion_id, 92.00
FROM songs s
JOIN emotions e ON e.label = 'Sad'
WHERE s.title IN ('Agar Tum Mil Jao', 'Cold Mess', 'Husn', 'Lose Control', 'Pehle Bhi Main');

INSERT IGNORE INTO song_emotions (song_id, emotion_id, relevance_score)
SELECT s.song_id, e.emotion_id, 90.00
FROM songs s
JOIN emotions e ON e.label = 'Calm'
WHERE s.title IN ('Adiyae', 'Hayyoda', 'Kasoor', 'Kun Faya Kun', 'Unakku Thaan');

INSERT IGNORE INTO song_emotions (song_id, emotion_id, relevance_score)
SELECT s.song_id, e.emotion_id, 94.00
FROM songs s
JOIN emotions e ON e.label = 'Energetic'
WHERE s.title IN ('Beautiful Things', 'Kaavaalaa', 'Ordinary Person', 'Nee Singam Dhan', 'Vaathi Coming');
