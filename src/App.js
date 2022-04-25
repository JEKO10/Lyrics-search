import TopSongs from "./components/TopSongs";
import SingleTrack from "./components/SingleTrack";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<TopSongs loading={loading} setLoading={setLoading} />}
          />
          <Route
            exact
            path="/track/:id"
            element={<SingleTrack loading={loading} setLoading={setLoading} />}
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
