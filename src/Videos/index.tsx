import Carousel from "../Carousel";
import useVideo from "../store";
import type { GenreRow } from "../data";

const Videos = ({data}:{data:GenreRow[]}) => {
  const navigating = useVideo((state:any) => state.navigating)

    return (
    <div className="relative">
        <ul>
            {
            data.map((rowData,index) => (
              <Carousel
                key={rowData.genre}
                genre={rowData.genre}
                data={rowData.movies}
                row={index}
              />    
            ))}
        </ul>
        <div className={`absolute inset-0 w-full h-full bg-black transition duration-1000 pointer-events-none ${navigating ? "bg-black/80 z-51": "bg-transparent"}`}>
        </div>
    </div>
  )
}

export default Videos