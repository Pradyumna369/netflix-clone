import Header from "../Header";
import Videos from "../Videos";
import useVideo from "../store";
import { useRef } from "react";
import VideoCard from "../Videos/VideoCard";

const HomePage = ({props}:any) => {
    const title = "SAMPLE TITLE";
    const subTitle = "SAMPLE SUBTITLE";
    const currentElement = useVideo((state:any) => state.currentElement);
    const playVideo = useVideo((state:any) => state.playVideo);
    const vidRef = useRef(null);
    if (currentElement === 'pause'){
        vidRef.current.play();
    } else if(currentElement !== ""){
        vidRef.current.pause();
    }

  return (
    <div>
      <Header />
            <div className="relative w-full h-full">
                <video
                    autoPlay
                    loop
                    muted
                    className="object-cover h-full aspect-16/9"
                    ref={vidRef}
                >
                    <source src="/main-sample.mp4" type="video/mp4" />
                </video>
                <div className="absolute top-3/7 px-4">
                <div className="leading-9">
                    <img
                    src="Netflix_Logo_RGB.png"
                    alt="NETFLIX"
                    className="w-40 h-11 px-7"
                    />
                </div>
                <div className="text-white px-10 font-black text-4xl/6 tracking-widest">
                    {title}
                </div>
                <div className="text-white pl-17 text-2xl/15 tracking-wider">
                    {subTitle}
                </div>
                </div>

                <div className="absolute top-4/5 z-1 w-full">
                    <Videos/>
                </div>
                <div className="absolute bottom-0 h-2/7 w-full bg-linear-to-t from-black to-transparent">
                </div>
            </div>
        {playVideo?
            <VideoCard/> : <></>
        }
        
    </div>
  );
};

export default HomePage;