import Header from "../Header";
import Videos from "../Videos";
import useVideo from "../store";
import { useEffect, useRef, useState, useLayoutEffect} from "react";
import VideoCard from "../Videos/VideoCard";
import CustomLink from "../CustomLink";
import InfoCard from "../InfoCard";
import type { Movie } from "../Movie";
import moviesList from "../data";
import type StoreState from "../StoreState";

const HomePage = ({movie, endedVideo, setEndedVideo}:{movie: Movie, endedVideo: boolean, setEndedVideo: (val:boolean) => void}) => {
    const mainMovie = movie;
    const [playingVideo, setPlayingVideo] = useState(false);
    const navigating = useVideo((state: StoreState) => state.navigating);
    const setNavigating = useVideo((state: StoreState) => state.setNavigating);
    const currentElement = useVideo((state: StoreState) => state.currentElement);
    const playVideo = useVideo((state: StoreState) => state.playVideo);
    const vidRef = useRef<HTMLVideoElement | null>(null);
    const muted = useVideo((state: StoreState) => state.muted);
    const setMuted = useVideo((state: StoreState) => state.setMuted);
    const [showInfo, setShowInfo] = useState(false);
    const [infoMovie, setInfoMovie] = useState({} as Movie);
    const allVideos = moviesList();

    useEffect(() => {
        const video = vidRef.current;
        if (!video) return;
        if (!playingVideo) return;
        if (playingVideo) {
            if (currentElement === ""){
                video.play();
            } else if(currentElement !== ""){
                video.pause();
            }
    }}, [currentElement, playingVideo]);

    useEffect(() => {
        if (!endedVideo)
            setTimeout(() => setPlayingVideo(true), 500);
    }, []);

    useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    
  return (
    <div>
      <Header />
            <div className={`relative w-full min-w-[800px]`}>
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
                    <source src={mainMovie.previewUrl} type="video/mp4" />
                    </video> : 
                    <img className="object-cover w-screen h-full aspect-16/9 -mt-10"
                        src={mainMovie.imgUrl}
                    ></img>
                }
                
                <div className={`absolute top-1/2 ml-[3%] pl-[0.5rem]`}>
                    <div className={`transition duration-1000 ease-in-out origin-bottom-left ${playingVideo ? "delay-6000 scale-[0.8]" : "delay-1000 -translate-y-15 scale-[1.1]"}`}>
                        <div className="leading-9">
                            <img
                            src="Netflix_Logo_RGB.png"
                            alt="NETFLIX"
                            className="w-30 -ml-2"
                            />
                        </div>
                        <div className="text-white font-sherif font-black tracking-tight text-4xl/6 ">
                            {mainMovie.title}
                        </div>
                    </div>
                    <div className={`w-200 overflow-hidden transition-height duration-1000 ease-in-out mt-5 ${playingVideo ? "delay-6000 h-0" : "delay-1000 h-15 -translate-y-15"}`}>
                        <p className="text-white text-md">{mainMovie.description}</p>
                    </div>
                    <div className="absolute top-25 flex gap-5 w-[90vw]">
                        <CustomLink to="/play">
                            <div className="bg-white w-27 flex p-2 items-center rounded-sm">
                                <img src="play.png" className="w-5 h-5 mx-3"/>
                                <button className="font-semibold">Play</button>
                            </div>
                        </CustomLink>
                        <div className="bg-gray-500/50 w-fit flex p-2 items-center rounded-sm" onClick={() => {
                            setShowInfo(true)
                            setNavigating(true)
                            setPlayingVideo(false)
                            setEndedVideo(true)
                            setInfoMovie(mainMovie)
                            }}>
                            <img src="info.png" className="w-5 h-5 mx-3"/>
                            <button className="font-semibold text-white mr-3">More Info</button>
                        </div>
                        {   
                            playingVideo ? 
                                muted ? 
                                <button onClick={() => setMuted(false)} className={`absolute right-0 w-10 h-10 bg-transparent rounded-full border border-white flex justify-center items-center`}>
                                    <img src="speaker.png" className="w-6 h-6"/> 
                                </button>
                                :
                                <button onClick={() => setMuted(true)} className={`absolute right-0 w-10 h-10 bg-transparent rounded-full border border-white flex justify-center items-center`}>
                                    <img src="mute.png" className="w-6 h-6"/>
                                </button>
                                : endedVideo ?
                                <button onClick={() => {
                                    setPlayingVideo(true)
                                    const video = vidRef.current;
                                    if (!video) return;
                                    video.play()
                                    }} className={`absolute right-0 w-10 h-10 bg-transparent rounded-full border border-white flex justify-center items-center`}>
                                    <img src="replay.png" className="w-6 h-6"/>
                                </button> : ""
                        }
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
                        <div className={`absolute inset-0 w-full h-full bg-black  transition duration-1000 pointer-events-none ${navigating ? "bg-black/80 z-51": "bg-transparent"}`}>

                        </div>
                }
            </div>
        {
            playVideo ?
            <VideoCard setShowInfo={setShowInfo} setInfoMovie={setInfoMovie} setNavigating={setNavigating}
                setEndedVideo={setEndedVideo} setPlayingVideo={setPlayingVideo}
            /> : <></>
        }
        {
            showInfo ?
            <div className="absolute z-52 justify-items-center"
                style={{top:window.scrollY + 10}}
            >
                <InfoCard movie={infoMovie} setShowInfo={setShowInfo}/>
            </div>
             :
            ""
        }
    </div>
  );
};

export default HomePage;