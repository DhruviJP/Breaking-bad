import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { Routes, Route } from "react-router-dom";
import Episode from "./components/EpisodeDetails";
import EpisodeDetails from "./components/EpisodeDetails";
import Character from "./components/Character";
import AllEpisode from "./components/AllEpisode";
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/episode" element={<Episode />}>
          <Route path="/episode/:episodeID" element={<EpisodeDetails />} />
        </Route>
        <Route path="/character/:characterID" element={<Character />} />
        <Route path="/allepisode" element={<AllEpisode />} />
      </Routes>
    </>
  );
}

export default App;
