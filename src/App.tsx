import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import PlayMovie from "./PlayMovie";
import MyList from "./MyList";
import { useState } from "react";
import "./App.css";
import movies from "./Database";
import type { Movie } from "./Movie";

const App = () => {
  const [endedVideo, setEndedVideo] = useState(false);
  const movie = movies.at(-1) as Movie;
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage movie={movie} endedVideo={endedVideo} setEndedVideo={setEndedVideo}/>}/>
          <Route path="/play" element={<PlayMovie/>}/>
          <Route path="/myList" element={<MyList/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;