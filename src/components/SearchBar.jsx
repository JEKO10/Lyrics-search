import React, { useEffect, useState } from "react";

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
    console.log(searched);
  }, [query]);

  return (
    <section className="searchBar">
      <input
        type="text"
        placeholder="Search for tracks"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
    </section>
  );
}

export default Search;
