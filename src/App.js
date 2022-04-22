import TopSongs from "./components/TopSongs";
import SingleTrack from "./components/SingleTrack";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<TopSongs />} />
          <Route exact path="/track/:id" element={<SingleTrack />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
