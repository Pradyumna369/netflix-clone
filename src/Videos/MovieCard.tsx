import type  { Movie }  from "../Movie.ts";
import useVideo from "../store";
import {useRef} from "react";
import type StoreState from "../StoreState.ts";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const videoRef = useRef<HTMLImageElement | null>(null);
  const setCoordinates = useVideo((state: StoreState) => state.setCoordinates);
  const setPlayVideo = useVideo((state: StoreState) => state.setPlayVideo);
  const setCurrentMovie = useVideo((state: StoreState) => state.setCurrentMovie);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null); 

  const handleMouseEnter = () => {
    setCurrentMovie(movie);
    const rect = videoRef.current?.getBoundingClientRect(); 
    if (!rect) return
    const y = rect?.y + window.scrollY;
    setCoordinates(rect?.left, y, rect?.width, rect?.height);
    hoverTimerRef.current = setTimeout(() => 
      setPlayVideo(true), 500);
  };
  
  // Cancelling the timer if the mouse leaves the moviecard before the video starts playing
  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }

  return (
    <div
      className="relative aspect-video overflow-hidden rounded-sm bg-black w-full cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
            <img
                src={movie.imgUrl}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 cursor-pointer"
                ref={videoRef}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

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