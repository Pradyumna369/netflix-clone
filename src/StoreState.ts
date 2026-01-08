import type { Movie } from "./Movie";

export default interface StoreState {
    allMovies: Movie[],
    coordinates: Map<string, number>
    playVideo: boolean,
    currentMovie: Movie,
    setCurrentMovie: (movie : Movie) => void,
    setPlayVideo: (val: boolean) => void,
    setCoordinates: (x: number, y: number, width: number, height: number) => void,
    removeCoordinates: () => void,
    myList: Movie[],
    addToMyList: (movie: Movie) => void,
    removeFromMyList: (movie: Movie) => void,
    muted: boolean,
    setMuted: (val: boolean) => void,
    navigating: boolean,
    setNavigating: (val: boolean) => void,
}