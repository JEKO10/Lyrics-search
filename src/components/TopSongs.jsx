import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function TopSongs() {
  const [songs, setSongs] = useState([]);
  const key = "396e01083953a35374e8be9bf794350a";

  const fetchSongs = async () => {
    const response = await fetch(
      `https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${key}`
    );
    const data = await response.json();
    setSongs(data.message.body.track_list);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <section className="topSongs">
      {songs.map((song) => {
        return (
          <div key={song.track.track_id}>
            <h3>{song.track.artist_name}</h3>
            <h4>
              <span>Track:</span> {song.track.track_name}
            </h4>
            <h4>
              <span>Album:</span> {song.track.album_name}
            </h4>
            <Link to={`/track/${song.track.track_id}`}>View Lyrics</Link>
          </div>
        );
      })}
    </section>
  );
}

export default TopSongs;
