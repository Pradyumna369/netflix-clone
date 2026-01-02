import Header from "../Header";
import Videos from "../Videos";
import useVideo from "../store";
import { useEffect, useRef, useState } from "react";
import VideoCard from "../Videos/VideoCard";

const HomePage = ({endedVideo, setEndedVideo}:{endedVideo: boolean, setEndedVideo: () => void}) => {
    const title = "STRANGER THINGS";
    const [playingVideo, setPlayingVideo] = useState(false);
    const currentElement = useVideo((state:any) => state.currentElement);
    const allVideos = useVideo((state:any) => state.allMovies)
    const playVideo = useVideo((state:any) => state.playVideo);
    const vidRef = useRef(null);
    const muted = useVideo((state: any) => state.muted);
    const setMuted = useVideo((state: any) => state.setMuted);
    useEffect(() => {
        if (playingVideo) {
            if (currentElement === ""){
            vidRef.current.play();
        } else if(currentElement !== ""){
            vidRef.current.pause();
        }
    }}, [currentElement]);

    useEffect(() => {
        if (!endedVideo)
            setTimeout(() => setPlayingVideo(true), 300);
    }, []);
    
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
                    onEnded={() => {
                        setPlayingVideo(false)
                        setEndedVideo(true)
                    }}
                    >
                    <source src="/main_clip.mp4" type="video/mp4" />
                    </video> : 
                    <img className="object-cover w-screen h-full aspect-16/9 -mt-10"
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
                    playingVideo ? 
                        muted ? 
                        <button onClick={() => setMuted(false)} className={`absolute top-130 right-20 w-10 h-10 bg-white rounded-full transition-opacity duration-300 ease-in-out opacity-60 flex justify-center items-center`}>
                            <img src="volume.png" className="w-9 h-9"/> 
                        </button>
                        :
                        <button onClick={() => setMuted(true)} className={`absolute top-130 right-20 w-10 h-10 bg-white rounded-full transition-opacity duration-300 ease-in-out opacity-60`}>
                            <img src="mute.png" className="w-10 h-10"/>
                        </button>
                        : endedVideo ?
                        <button onClick={() => {
                            setPlayingVideo(true)
                            vidRef.current.play()
                            }} className={`absolute top-130 right-20 w-10 h-10 bg-transparent rounded-full transition-opacity duration-300 ease-in-out opacity-60 border border-white flex justify-center items-center`}>
                            <img src="replay.png" className="w-6 h-6"/>
                        </button> : ""
                }
            </div>
        {playVideo ?
            <VideoCard/> : <></>
        }
    </div>
  );
};

export default HomePage;