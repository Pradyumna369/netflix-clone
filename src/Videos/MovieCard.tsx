import type  { Movie }  from "../Movie.ts";
import useVideo from "../store";
import {useRef} from "react";

const MovieCard = ({ movie, index }: { movie: Movie; index: number }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentElement = useVideo((state: any) => state.currentElement);
  const setCurrentElement = useVideo((state: any) => state.setCurrentElement);

  const handleMouseEnter = () => {
    setCurrentElement(index);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    setCurrentElement(null);
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div
      className="relative w-full aspect-video overflow-hidden rounded-lg bg-black border border-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {currentElement === index ? (
        <video
          ref={videoRef}
          src={movie.previewUrl}
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="relative aspect-video overflow-hidden rounded-lg group">
  <img
    src={movie.imgUrl}
    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
      )}
    </div>
  );
};

export default MovieCard;