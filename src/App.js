import { useEffect, useState } from "react";
import TopSongs from "./components/TopSongs";

function App() {
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
    <main>
      <TopSongs songs={songs} />
    </main>
  );
}

export default App;
