import Header from "./Header"
import MovieCard from "./Videos/MovieCard";
import useVideo from "./store";
import type { Movie } from "./Movie";
import VideoCard from "./Videos/VideoCard";

const MyList = () => {
    const myList = useVideo((state:any) => state.myList);
    const playVideo = useVideo((state:any) => state.playVideo);
  return (
    <>
        <Header/>
        <div className="h-20 text-white bolder pt-20 ml-15 text-3xl mb-5"> My List</div>
        <ul className="w-screen h-full p-10 flex flex-wrap text-white items-start">{ 
            myList.map((movie: Movie, index: string) => 
              <li key={index} className="h-35 aspect-[16/9] m-1 mb-15">
                <MovieCard movie={movie}/>
              </li>
          )}
        </ul>
        {
          myList.length === 0&& (
            <div className="absolute text-white text-2xl mt-4 translate-x-1/2">
              List is empty!!!
            </div>
          )
        }
          {playVideo ?
                      <VideoCard/> : <></>
          }
    </>
  )
}

export default MyList