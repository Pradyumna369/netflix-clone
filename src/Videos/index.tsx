import moviesDb from "../Database";
import Carousel from "../Carousel";

const Videos = () => {
  const categories = ["crime", "Thrillers", "you may like"] as any;
  const movies = moviesDb;

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