import useVideo from "../store"
import {useState, useEffect} from "react";
const VideoCard = () => {
    const coordinates = useVideo((state:any) => state.coordinates);
    const setCurrentElement = useVideo((state:any) => state.setCurrentElement);
    const x = coordinates.get("x");
    const y = coordinates.get("y");
    const width = coordinates.get("width");
    const height = coordinates.get("height");
    const removeCoordinates = useVideo((state: any) => state.removeCoordinates);
    const currentMovie = useVideo((state:any) => state.currentMovie);
    const setPlayVideo = useVideo((state:any) => state.setPlayVideo);
    const setCurrentMovie = useVideo((state:any) => state.setCurrentMovie);
    const handleMouseLeave = () => {
        removeCoordinates();
        setPlayVideo(false);
        setCurrentElement("pause");
        setCurrentMovie({});
    };
    if (x == null || y == null || width == null || height == null) return null;
    console.log("current movie is ...",currentMovie);
    
    return (
    <>
        <div className="absolute border border-white bg-black rounded-md z-50 overflow-hidden transition duration-200 ease-in-out hover:scale-150" 
            style={{
                top: y,
                left: x,
                width: width,
                height: height,
            }}
            onMouseLeave={handleMouseLeave}
        >
            <video autoPlay loop muted className=" object-cover w-full h-full aspect-[16/9]">
                <source src={currentMovie.previewUrl}/>
            </video>  
        </div>
    </>
  )
}

export default VideoCard