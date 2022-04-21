import { Link } from "react-router-dom";

function TopSongs({ songs }) {
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
