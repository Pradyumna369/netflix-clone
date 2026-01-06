import movies from "./Database";
import type { Movie } from "./Movie";

export type GenreRow = {
    genre: string;
    movies: Movie[];
};

const SHOWING_GENRES = [
    "Action Movies",
    "Sci-Fi Movies",
    "Drama Movies",
    "Thriller Movies",
    "Adventure Movies",
    "TV"
]

const moviesList = (): GenreRow[] => {
    const genres = new Map<string, Movie[]>();
    movies.forEach((movie) => {
        movie.genres.forEach((genre) => {
            if (!SHOWING_GENRES.includes(genre)) return;
            const list = genres.get(genre) ?? [];
            genres.set(genre, [...list, movie]);
        });
    });
    return Array.from(genres, ([genre, movies]) => ({
    genre,
    movies,
  }));
};

export default moviesList;