import Carousel from "../Carousel";
import type { Movie } from "../Movie";
import useVideo from "../store";

const Videos = ({data}:{data:Movie[]}) => {
  const categories = ["crime", "Thrillers", "you may like"] as any;
  const navigating = useVideo((state:any) => state.navigating)

    return (
    <div className="relative">
        <ul>
            {
            Array.from(categories).map((name,row) => (
              <div key={row}>
                <Carousel data={data} row={row}/>
              </div>
                
            )
            )}
        </ul>
        <div className={`absolute inset-0 w-full h-full bg-black transition duration-1000 pointer-events-none ${navigating ? "bg-black/80 z-51": "bg-transparent"}`}>
        </div>
    </div>
  )
}

export default Videos