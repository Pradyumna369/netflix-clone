import type  { Movie }  from "../Movie.ts";
import useVideo from "../store";
import {useRef, useState, useEffect} from "react";

const MovieCard = ({ movie, index }: { movie: Movie; index: string }) => {
  const videoRef = useRef<HTMLImageElement | null>(null);
  const currentElement = useVideo((state: any) => state.currentElement);
  const setCoordinates = useVideo((state: any) => state.setCoordinates);
  const setPlayVideo = useVideo((state:any) => state.setPlayVideo);
  const setCurrentMovie = useVideo((state: any) => state.setCurrentMovie);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    let rect = videoRef.current?.getBoundingClientRect(); 
    let y = rect?.y + scroll;
    setCoordinates(rect?.left, y, rect?.width, rect?.height);
    setTimeout(() => setPlayVideo(true), 500);
    setCurrentMovie(movie);
    console.log("setting current movie as ... ", movie);
  };

  return (
    <div
      className="relative aspect-video overflow-hidden rounded-lg bg-black w-full cursor-pointer"
      onMouseEnter={handleMouseEnter}
    >
            <img
                src={movie.imgUrl}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 cursor-pointer"
                ref={videoRef}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Title */}
            <div className="absolute bottom-3 left-3">
                <h3 className="text-white font-bold text-lg tracking-wide">
                {movie.title}
                </h3>
                <p className="text-gray-300 text-xs">
                {movie.subTitle}
                </p>
            </div>

    </div>
  );
};

export default MovieCard;