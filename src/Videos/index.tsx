import moviesDb from "../Database";
import Carousel from "../Carousel";
import type { Movie } from "../Movie";

const Videos = ({data}:{data:Movie[]}) => {
  const categories = ["crime", "Thrillers", "you may like"] as any;

    return (
    <div>
        <ul>
            {
            Array.from(categories).map((name,row) => (
              <div key={row}>
                <Carousel data={data} row={row}/>
              </div>
                
            )
            )}
        </ul>
    </div>
  )
}

export default Videos