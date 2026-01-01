import useVideo from "../store";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import type { Movie } from "../Movie";

const VideoCard = () => {
    const coordinates = useVideo((state:any) => state.coordinates);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const setCurrentElement = useVideo((state:any) => state.setCurrentElement);
    const x = coordinates.get("x");
    const y = coordinates.get("y");
    const width = coordinates.get("width");
    const height = coordinates.get("height");
    const [startVideo, setStartVideo] = useState(false);
    const removeCoordinates = useVideo((state: any) => state.removeCoordinates);
    const currentMovie = useVideo((state:any) => state.currentMovie);
    const setPlayVideo = useVideo((state:any) => state.setPlayVideo);
    const setCurrentMovie = useVideo((state:any) => state.setCurrentMovie);
    const [expanded, setExpanded] = useState(false);
    const [displayMute, setDisplayMute] = useState(true);
    const handleMouseLeave = () => {
        removeCoordinates();
        setPlayVideo(false);
        setCurrentElement("");
        setCurrentMovie({});
    };
    const myList = useVideo((state:any) => state.myList);
    const present = myList.some((m: Movie) => m._id === currentMovie._id);
    const addToMyList = useVideo((state:any) => state.addToMyList);
    const removeFromMyList = useVideo((state: any) => state.removeFromMyList);
    const [muted, setMuted] = useState(false);
    const handleAddToMyList = () => {
        addToMyList(currentMovie);
    };

    const handleRemoveFromList = () => {
        removeFromMyList(currentMovie);
    };

    useEffect(() => {
        var muteTimer = [] as any;
        const handleMouseMove = (e: MouseEvent) => {
            if (!cardRef.current) return;
            setDisplayMute(true);
            
            muteTimer.push(setTimeout(() => setDisplayMute(false), 3000));
            for (var i = 0; i < muteTimer.length - 1; i++) {
                clearTimeout(muteTimer[i]);
            }

            // Checking if the cursor is over the same element or its children
            if (!cardRef.current.contains(e.target as Node)) {
                handleMouseLeave();
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        setStartVideo(false);
        const timer = setTimeout(() => setStartVideo(true), 500);
        return () => clearTimeout(timer);
    }, [currentMovie]);

    useLayoutEffect(() => {
        requestAnimationFrame(() => {
            setExpanded(true);
        }
    )
    }, [currentMovie]);

    if (x == null || y == null || width == null || height == null ) return null;
    
    return (
    <>
        <div className={`absolute  bg-black rounded-md z-50 overflow-hidden transition-transform duration-200 ease-in-out 
                        ${expanded ? "scale-[1.2]" : "scale-100"}`} 
            style={{
                top: y,
                left: x,
                width: width,
            }}
            onMouseLeave={handleMouseLeave}
            ref={cardRef}
        >   
            {
                startVideo ?
                <div className="relative">
                    <video autoPlay loop muted={!muted} className=" object-cover w-full h-full aspect-[16/9]">
                        <source src={currentMovie.previewUrl}/>
                    </video> 
                    {
                        displayMute ? 
                        <div className="absolute bottom-3 left-3">
                            <h3 className="text-white font-bold text-sm tracking-wide">
                            {currentMovie.title}
                            </h3>
                            <p className="text-gray-300 text-xs">
                            {currentMovie.subTitle}
                            </p> 
                        </div> : ""
                    }
                    {
                        displayMute ? muted ? 
                        <button onClick={() => setMuted(false)} className=" absolute top-3 right-3 w-6 h-6 bg-white rounded-full">
                            <img src="volume.png" className="w-6 h-6"/> 
                        </button>
                        :
                        <button onClick={() => setMuted(true)} className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full">
                            <img src="mute.png" className="w-6 h-6"/>
                        </button>
                        : 
                        ""
                    }
                </div>
                :
                <div className="relative">
                    <img
                    src={currentMovie.imgUrl}
                    className="w-full h-full object-cover aspect-[16/9]"/>
                    <div className="absolute bottom-3 left-3">
                        <h3 className="text-white font-bold text-lg tracking-wide">
                        {currentMovie.title}
                        </h3>
                        <p className="text-gray-300 text-xs">
                        {currentMovie.subTitle}
                        </p>
                    </div>
                </div>
            }
            <div className="text-white flex mt-3 px-3 mb-3">
                <Link to="/play">
                    <img src="play-button-round-white-icon.png" className="w-7 h-7 mr-2"/>
                </Link>
                {
                    present ? 
                    <button onClick={handleRemoveFromList} className="cursor-pointer bg-white w-7 h-7 rounded-full mr-2 flex items-center justify-center">
                        <img src="check.png" className="w-6 h-6"/>
                    </button>
                    :
                    <button onClick={handleAddToMyList} className="cursor-pointer">
                        <img src="add-round-outline-white-icon.png" className="w-7 h-7 mr-2"/>
                    </button>
                }
                
                <img src="_.jpeg" className="w-7 h-7"/>
            </div>
            <div className="flex text-white px-3 text-xs items-center">
                <div className="border border-white-100 w-fit px-1">
                    {currentMovie.rating}
                </div>
                <div className="px-2">
                    {currentMovie.duration}
                </div>
                <div className="border border-white w-fit px-1 rounded-sm text-xs h-fit">
                    HD
                </div>
            </div>
            <div className="text-white text-sm flex text-xs pl-2 gap-1 mt-3 mb-3">
                {
                    currentMovie.tags?.slice(0, 2).map((tag: String, index:number) => {
                        return(
                            <div key={index}>
                                {`・${tag}`}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}

export default VideoCard