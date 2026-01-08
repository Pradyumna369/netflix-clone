import Carousel from "../Carousel";
import useVideo from "../store";
import type { GenreRow } from "../data";
import type StoreState from "../StoreState";

const Videos = ({data}:{data:GenreRow[]}) => {
  const navigating = useVideo((state:StoreState) => state.navigating)

    return (
    <div className="relative">
        <ul>
            {
            data.map((rowData) => (
              <Carousel
                key={rowData.genre}
                genre={rowData.genre}
                data={rowData.movies}
              />    
            ))}
        </ul>
        <div className={`absolute inset-0 w-full h-full bg-black transition duration-1000 pointer-events-none ${navigating ? "bg-black/80 z-51": "bg-transparent"}`}>
        </div>
    </div>
  )
}

export default Videos