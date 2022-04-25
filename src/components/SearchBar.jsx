import { useEffect, useState } from "react";
import { RiPlayFill, RiDiscFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Search() {
  const key = "396e01083953a35374e8be9bf794350a";
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState([]);

  const fetchSearched = async () => {
    const response = await fetch(
      `https://api.musixmatch.com/ws/1.1/track.search?q_track=${query}&page_size=10&page=1&s_track_rating=desc&apikey=${key}`
    );
    const data = await response.json();
    setSearched(data.message.body.track_list);
  };

  useEffect(() => {
    fetchSearched();
  }, [query]);

  return (
    <>
      <section className="searchBar">
        <input
          type="text"
          placeholder="Song title..."
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </section>
      {searched.length !== 0 && query ? (
        <>
          <h1 id="title">Searched tracks</h1>
          <section className="homeTracks">
            {searched.map((track) => {
              return (
                <div key={track.track.track_id}>
                  <div>
                    <h3>{track.track.artist_name}</h3>
                    <h4>
                      <strong>
                        <RiPlayFill /> Track
                      </strong>
                      : {track.track.track_name}
                    </h4>
                    <h4>
                      <strong>
                        <RiDiscFill /> Album
                      </strong>
                      : {track.track.album_name}
                    </h4>
                  </div>
                  <Link to={`/track/${track.track.track_id}`}>View Lyrics</Link>
                </div>
              );
            })}
          </section>
        </>
      ) : searched.length === 0 && query ? (
        <h1 id="title">No results!</h1>
      ) : (
        ""
      )}
    </>
  );
}

export default Search;
