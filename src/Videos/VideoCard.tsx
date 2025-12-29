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
    const setPlayVideo = useVideo((state:any) => state.setPlayVideo)
    const handleMouseLeave = () => {
        removeCoordinates();
        setPlayVideo(false);
        setCurrentElement("pause")
    };
    if (x == null || y == null || width == null || height == null) return null;
    console.log("scroll is is...",scroll);
    
    return (
    <>
        <div className="absolute border border-white bg-black rounded-sm z-50" 
            style={{
                top: y,
                left: x,
                width: 1.2 * width,
                height: 1.2 * height,
            }}
            onMouseLeave={handleMouseLeave}
        >
            <video autoPlay loop muted className=" object-cover w-full h-full rounded-xl aspect-[16/9]">
                <source src="sample.mp4#t=10"/>
            </video>  
        </div>
    </>
  )
}

export default VideoCard