import moviesDb from "../Database";
import Carousel from "../Carousel";
import type { Movie } from "../Movie";

const Videos = ({page}:{page:Movie[]}) => {
  const categories = ["crime", "Thrillers", "you may like"] as any;
  const currentPage = page || categories;
  const movies = page;

    return (
    <div>
        <ul>
            {
            Array.from(categories).map((name,row) => (
                <Carousel data={movies} row={row}/>
            )
            )}
        </ul>
    </div>
  )
}

export default Videos