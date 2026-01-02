import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import PlayMovie from "./PlayMovie";
import MyList from "./MyList";
import { useState } from "react";
const App = () => {
  const [endedVideo, setEndedVideo] = useState(false);
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage endedVideo={endedVideo} setEndedVideo={setEndedVideo}/>}/>
          <Route path="/play" element={<PlayMovie/>}/>
          <Route path="/myList" element={<MyList/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;