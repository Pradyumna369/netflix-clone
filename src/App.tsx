import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import PlayMovie from "./PlayMovie";
import MyList from "./MyList";
const App = () => {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="/play" element={<PlayMovie/>}/>
          <Route path="/myList" element={<MyList/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;