import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Carousel from "./Carousel";
const App = () => {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="/carousel" element={<Carousel/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;