import Header from "../Header";
import Videos from "../Videos";
import useVideo from "../store";
import { useEffect, useRef, useState } from "react";
import VideoCard from "../Videos/VideoCard";

const HomePage = ({props}:any) => {
    const title = "STRANGER THINGS";
    const [playingVideo, setPlayingVideo] = useState(true);
    const currentElement = useVideo((state:any) => state.currentElement);
    const allVideos = useVideo((state:any) => state.allMovies)
    const playVideo = useVideo((state:any) => state.playVideo);
    const vidRef = useRef(null);
    const muted = useVideo((state: any) => state.muted);
    const setMuted = useVideo((state: any) => state.setMuted);
    useEffect(() => {
    if (currentElement === ""){
        vidRef.current.play();
    } else if(currentElement !== ""){
        vidRef.current.pause();
    }
    }, [currentElement]);
    
  return (
    <div>
      <Header />
            <div className="relative w-full ">
                {
                    playingVideo ?
                    <video
                    autoPlay
                    muted={!muted}
                    className="object-cover h-full aspect-16/9 -mt-10"
                    ref={vidRef}
                    >
                    <source src="/main_clip.mp4" type="video/mp4" />
                    </video> : 
                    <img className="object-cover w-screen h-full aspect-16/9"
                        src="main_poster.png"
                    ></img>
                }
                
                <div className="absolute top-3/7 px-4">
                <div className="leading-9">
                    <img
                    src="Netflix_Logo_RGB.png"
                    alt="NETFLIX"
                    className="w-40 h-11 px-7"
                    />
                </div>
                <div className="text-white px-10 font-sherif font-black tracking-tight text-4xl/6 ">
                    {title}
                </div>
                </div>

                <div className="absolute top-7/9 z-1 w-full">
                    <Videos data={allVideos}/>
                </div>
                <div className="absolute bottom-1/12 h-2/9 w-full bg-linear-to-t from-black to-transparent">
                </div>
                <div className="absolute bottom-0 h-1/12 w-full bg-black">
                </div>
                {
                        muted ? 
                        <button onClick={() => setMuted(false)} className={`absolute top-130 right-20 w-10 h-10 bg-white rounded-full transition-opacity duration-300 ease-in-out opacity-50`}>
                            <img src="volume.png" className="w-10 h-10"/> 
                        </button>
                        :
                        <button onClick={() => setMuted(true)} className={`absolute top-130 right-20 w-10 h-10 bg-white rounded-full transition-opacity duration-300 ease-in-out opacity-50`}>
                            <img src="mute.png" className="w-10 h-10"/>
                        </button>
                    }
            </div>
        {playVideo ?
            <VideoCard/> : <></>
        }
    </div>
  );
};

export default HomePage;