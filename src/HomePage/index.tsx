import Header from "../Header";
import Videos from "../Videos";
import useVideo from "../store";
import { useEffect, useRef, useState } from "react";
import VideoCard from "../Videos/VideoCard";

const HomePage = ({endedVideo, setEndedVideo}:{endedVideo: boolean, setEndedVideo: (val:boolean) => void}) => {
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
                
                <div className={`absolute top-3/7 px-12 `}>
                    <div className={`transition duration-1000 ease-in-out origin-bottom-left ${playingVideo ? "delay-8000 scale-[0.8]" : "delay-1000 -translate-y-15 scale-[1.5]"}`}>
                        <div className="leading-9">
                            <img
                            src="Netflix_Logo_RGB.png"
                            alt="NETFLIX"
                            className="w-30 h-11 -ml-2"
                            />
                        </div>
                        <div className="text-white font-sherif font-black tracking-tight text-4xl/6 ">
                            {title}
                        </div>
                    </div>
                    <div className={`w-200 overflow-hidden transition-height duration-1000 ease-in-out mt-5 ${playingVideo ? "delay-8000 h-0" : "delay-1000 h-15 -translate-y-15"}`}>
                        <p className="text-white text-md">When the darkness beneath a small town begins to rise, a group of friends must confront a terrifying force that threatens to tear their world apart — and change them forever.</p>
                    </div>
                    <div className="absolute top-25 flex gap-5">
                        <div className="bg-white w-27 flex p-2 items-center rounded-sm">
                            <img src="play.png" className="w-5 h-5 mx-3"/>
                            <button className="font-semibold">Play</button>
                        </div>
                        <div className="bg-gray-500/50 w-fit flex p-2 items-center rounded-sm">
                            <img src="info.png" className="w-5 h-5 mx-3"/>
                            <button className="font-semibold text-white mr-3">More Info</button>
                        </div>
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
                        <button onClick={() => setMuted(false)} className={`absolute top-130 right-20 w-10 h-10 bg-transparent rounded-full border border-white flex justify-center items-center`}>
                            <img src="speaker.png" className="w-6 h-6"/> 
                        </button>
                        :
                        <button onClick={() => setMuted(true)} className={`absolute top-130 right-20 w-10 h-10 bg-transparent rounded-full border border-white flex justify-center items-center`}>
                            <img src="mute.png" className="w-6 h-6"/>
                        </button>
                        : endedVideo ?
                        <button onClick={() => {
                            setPlayingVideo(true)
                            vidRef.current.play()
                            }} className={`absolute top-130 right-20 w-10 h-10 bg-transparent rounded-full border border-white flex justify-center items-center`}>
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