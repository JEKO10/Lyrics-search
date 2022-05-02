import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiPlayFill, RiDiscFill } from "react-icons/ri";
import SearchBar from "./SearchBar";

function TopSongs({ loading, setLoading }) {
  const [songs, setSongs] = useState([]);
  const key = "396e01083953a35374e8be9bf794350a";

  const fetchSongs = async () => {
    setLoading(true);
    const response = await fetch(
      `https://jekocorsproxy.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${key}`
    );
    const data = await response.json();
    setSongs(data.message.body.track_list);
    setLoading(false);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  if (loading) {
    return <div className="loading"></div>;
  } else {
    return (
      <>
        <SearchBar />
        <h1 id="title">Top 10 tracks</h1>
        <section className="homeTracks">
          {songs.map((song) => {
            return (
              <div key={song.track.track_id}>
                <h3>{song.track.artist_name}</h3>
                <h4>
                  <strong>
                    <RiPlayFill /> Track
                  </strong>
                  : {song.track.track_name}
                </h4>
                <h4>
                  <strong>
                    <RiDiscFill /> Album
                  </strong>
                  : {song.track.album_name}
                </h4>
                <Link to={`/track/${song.track.track_id}`}>View Lyrics</Link>
              </div>
            );
          })}
        </section>
      </>
    );
  }
}

export default TopSongs;
