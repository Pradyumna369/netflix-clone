import Header from "./Header"
import MovieCard from "./Videos/MovieCard";
import useVideo from "./store";
import type { Movie } from "./Movie";
import VideoCard from "./Videos/VideoCard";
import type StoreState from "./StoreState";

const MyList = () => {
    const myList = useVideo((state: StoreState) => state.myList);
    const playVideo = useVideo((state: StoreState) => state.playVideo);
  return (
    <div>
        <Header/>
        <div className="h-20 text-white bolder pt-20 ml-15 text-3xl mb-5"> My List</div>
        <ul className="w-screen h-full p-10 flex flex-wrap text-white items-start">{ 
            myList.map((movie: Movie) => 
              <li key={movie._id} className="h-35 aspect-[16/9] m-1 mb-15">
                <MovieCard movie={movie}/>
              </li>
          )}
        </ul>
          {playVideo ?
                      <VideoCard/> : <></>
          }
    </div>
  )
}

export default MyList