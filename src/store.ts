import {create} from 'zustand';
import type { Movie } from './Movie';
import movies from './Database';

const useVideo = create((set) => ({
    allMovies: movies,
    currentElement: "",
    setCurrentElement: (element: string) => set(({currentElement:element})),
    coordinates: new Map([
        ["x",0],
        ["y",0],
        ["width",0],
        ["height",0]

    ]),
    playVideo: false,
    currentMovie: {} as Movie,
    setCurrentMovie: (movie : Movie) => set(({currentMovie: movie})),
    setPlayVideo: (val: boolean) => set({playVideo:val}),
    setCoordinates: (x: number, y: number, width: number, height: number) => 
        set((state: any) => {
        const newCoordinates = new Map(state.coordinates)
        newCoordinates.set("x", x)
        newCoordinates.set("y", y)
        newCoordinates.set("width", width)
        newCoordinates.set("height", height)
        return {coordinates: newCoordinates}
    }),
    removeCoordinates: () => set((state:any) => {
        return {coordinates: new Map([
        ["x",0],
        ["y",0],
        ["width",0],
        ["height",0]

    ])}
    },),
    myList: [] as Movie[],
    addToMyList: (movie: Movie) => set((state:any) => {
        const newList = [...state.myList, movie]
        return {myList: newList}
    })
}
))

export default useVideo;