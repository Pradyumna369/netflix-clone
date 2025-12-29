import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import VideoCard from "./Videos/VideoCard";
const App = () => {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="/video" element={<VideoCard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;