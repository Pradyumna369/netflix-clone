import useVideo from "../store";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import CustomLink from "../CustomLink";
import type { Movie } from "../Movie";
import type StoreState from "../StoreState";

type VideoCardProps = {
    setShowInfo?: (val: boolean) => void;
    setInfoMovie?: (movie: Movie) => void;
    setNavigating?: (val: boolean) => void;
    setEndedVideo?: (val: boolean) => void;
    setPlayingVideo?: (val: boolean) => void;
}

const VideoCard = ({setShowInfo, setInfoMovie, setNavigating, setEndedVideo, setPlayingVideo}: VideoCardProps) => {
    const coordinates = useVideo((state: StoreState) => state.coordinates);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const setCurrentElement = useVideo((state: StoreState) => state.setCurrentElement);
    const x = coordinates.get("x");
    const y = coordinates.get("y");
    const width = coordinates.get("width");
    const height = coordinates.get("height");
    const [startVideo, setStartVideo] = useState(false);
    const removeCoordinates = useVideo((state: StoreState) => state.removeCoordinates);
    const currentMovie = useVideo((state: StoreState) => state.currentMovie);
    const setPlayVideo = useVideo((state: StoreState) => state.setPlayVideo);
    const setCurrentMovie = useVideo((state: StoreState) => state.setCurrentMovie);
    const [expanded, setExpanded] = useState(false);
    const [displayMute, setDisplayMute] = useState(true);
    const handleMouseLeave = () => {
        removeCoordinates();
        setPlayVideo(false);
        setCurrentElement("");
        setCurrentMovie({} as Movie);
    };
    const myList = useVideo((state: StoreState) => state.myList);
    const present = myList.some((m: Movie) => m._id === currentMovie._id);
    const addToMyList = useVideo((state: StoreState) => state.addToMyList);
    const removeFromMyList = useVideo((state: StoreState) => state.removeFromMyList);
    const muted = useVideo((state: StoreState) => state.muted);
    const setMuted = useVideo((state: StoreState) => state.setMuted);
    const handleAddToMyList = () => {
        addToMyList(currentMovie);
    };
    const handleRemoveFromList = () => {
        removeFromMyList(currentMovie);
    };

    // Creating a timer ref which persists across renders
    const muteTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        // setStartVideo(false);
        const timer = setTimeout(() => setStartVideo(true), 800);
        return () => clearTimeout(timer);
    }, [currentMovie]);

    useLayoutEffect(() => {
        requestAnimationFrame(() => {
            setExpanded(true);
        }
    )}, [currentMovie]);

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
            onMouseMove={() => {
                setDisplayMute(true);
                if (muteTimerRef.current) {
                    clearTimeout(muteTimerRef.current)
                }
                muteTimerRef.current = setTimeout(() => {
                    setDisplayMute(false);
                }, 2000);
            }}
        >   
            {
                startVideo ?
                <div className="relative">
                    <video autoPlay loop muted={!muted} className=" object-cover w-full h-full aspect-[16/9]">
                        <source src={currentMovie.previewUrl}/>
                    </video> 
                    {
                        <div className="absolute bottom-3 left-3">
                            <h3 className={`text-white font-bold text-sm tracking-wide transition-opacity duration-300 ease-in-out ${displayMute ? "opacity-100" : "opacity-0"}`}>
                            {currentMovie.title}
                            </h3>
                            <p className={`text-white text-xs transition-opacity duration-300 ease-in-out ${displayMute ? "opacity-100" : "opacity-0"}`}>
                            {currentMovie.subTitle}
                            </p> 
                        </div> 
                    }
                    {
                        muted ? 
                        <button onClick={() => setMuted(false)} className={`absolute top-3 right-3 w-6 h-6 flex items-center justify-center bg-black/50 rounded-full transition-opacity duration-300 ease-in-out ${displayMute ? "opacity-80" : "opacity-0"}`}>
                            <img src="speaker.png" className="w-4 h-4"/> 
                        </button>
                        :
                        <button onClick={() => setMuted(true)} className={`absolute top-3 right-3 w-6 h-6 flex items-center justify-center bg-black/50 rounded-full transition-opacity duration-300 ease-in-out ${displayMute ? "opacity-80" : "opacity-0"}`}>
                            <img src="mute.png" className="w-4 h-4"/>
                        </button>
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
            <div className="text-white flex justify-between mt-3 px-3 mb-3 items-center">
                <div className="flex items-center">
                    <CustomLink to="/play">
                        <img src="play-button-round-white-icon.png" className="w-7 h-7 mr-2"/>
                    </CustomLink>
                    {
                        present ? 
                        <button onClick={handleRemoveFromList} className="relative group cursor-pointer bg-white w-7 h-7 rounded-full mr-2 flex items-center justify-center">
                            <img src="check.png" className="w-6 h-6"/>
                            <span className="absolute -top-8 -left-10 text-xs w-35 ml-1 bg-gray-100 text-black font-semibold p-1 rounded-sm invisible group-hover:visible">Remove from My List</span>
                        </button>
                        :
                        <button onClick={handleAddToMyList} className="relative group cursor-pointer">
                            <img src="add-round-outline-white-icon.png" className="w-7 h-7 mr-2"/>
                            <span className="absolute -top-8 -left-10 text-xs w-35 ml-1 bg-gray-100 text-black font-semibold p-1 rounded-sm invisible group-hover:visible">Add to My List</span>
                        </button>
                    }
                    <img src="_.jpeg" className="w-7 h-7"/>
                </div>
                <button className="w-7 h-7 rounded-full border border-white flex items-center justify-center bg-black/50 cursor-pointer"
                onClick={() => {
                    if (!setShowInfo || !setInfoMovie || !setNavigating || !setPlayingVideo || !setEndedVideo) return;
                    setShowInfo(true)
                    setInfoMovie(currentMovie)
                    setNavigating(true)
                    setPlayingVideo(false)
                    setEndedVideo(true)
                    removeCoordinates();
                    setPlayVideo(false);
                    setCurrentElement("");
                    setCurrentMovie({} as Movie);
                    }}
                    >
                    <img src="down_arrow.png" className="w-5 h-5"/>
                </button>
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
                    currentMovie.tags?.slice(0, 2).map((tag: string, index:number) => {
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