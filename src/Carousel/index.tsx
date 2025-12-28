import "./carousel.css";
import { useEffect, useRef, useState } from "react";
import throttle from "lodash/throttle";
import useVideo from "../store";
import MovieCard from "../Videos/MovieCard";
import movies from "../Database";
import type { Movie } from "../Movie";

const Carousel = ({data, row}:{data: Movie[], row: number}) => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [itemCount, setItemCount] = useState(0);
    const [itemsPerScreen, setItemsPerScreen] = useState(1);
    const progressBarItemCount = itemsPerScreen > 0 ? 
        Math.ceil(itemCount / itemsPerScreen): 0;
    const TRANSITION_MS = 500;
    const setCurrentElement = useVideo((state:any) => state.setCurrentElement);

    useEffect(() => { 
        const slider = sliderRef.current
        if (!slider) return;
        setItemCount(slider.children.length);
        const value = parseInt(getComputedStyle(slider)
                                    .getPropertyValue("--items-per-screen"));
        setItemsPerScreen(Number.isNaN(value) ? 1 : value);
        const throttleProgressBar = throttle(() => {
        setItemsPerScreen(parseInt(getComputedStyle(slider)
                                .getPropertyValue("--items-per-screen")));
        }, 200);
        window.addEventListener("resize", throttleProgressBar);

        return () => {
            window.removeEventListener("resize", throttleProgressBar);
        }
    }, [data]);

    useEffect(() => {
        if (sliderIndex >= progressBarItemCount) {
            setSliderIndex(Math.max(progressBarItemCount - 1, 0));
        }
    },[progressBarItemCount]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setActiveIndex(sliderIndex);
        }, TRANSITION_MS);

        return () => clearTimeout(timeout);
    }, [sliderIndex]);

    const handleForward = () => {
        if (sliderIndex === progressBarItemCount - 1) {
                setSliderIndex(0);
        } else {
                setSliderIndex(sliderIndex + 1);
        }
    }

    const handleBackward = () => {
        if (sliderIndex === 0) {
                setSliderIndex(progressBarItemCount - 1); 
        } else {
                setSliderIndex(sliderIndex - 1);
        } 
    }

    return(
        <div className="row">
        <div className="header">
            <h3 className="title text-white justify-between">Title</h3>
            <p className="text-white">{itemsPerScreen}</p>
            <div className="progress-bar">
                {
                    Array.from({length: progressBarItemCount}).map((_,i) => (
                        <div key={i} 
                        className={`progress-item ${i === activeIndex ? "active":""}`}
                        > 
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="carousel">
                <button 
                className={`handle left-handle ${sliderIndex === 0 ? "" : "bg-black/50"}`}
                onClick={handleBackward}
                >
                    <div className="arrow">&#8249;</div>
                </button>
            <div className="slider"
                ref={sliderRef}
                style={{transform: `translateX(-${sliderIndex * 100}%)`}}
            >
                    {
                movies.map((movie,index) => (
                    <div key={index}
                    onMouseEnter={() => setCurrentElement(`${row} ${index}`)}
                    onMouseLeave={() =>  setCurrentElement("pause")}
                    >
                        <MovieCard movie={movie} index={`${row} ${index}`}/>
                        </div>
                    ))}
            </div>
            <button 
            className={`handle right-handle ${(sliderIndex === progressBarItemCount - 1 && itemCount % itemsPerScreen !== 0) ? "" : "bg-black/50"}`}
            onClick={handleForward}
            >
                <div className="arrow">&#8250;</div>
            </button>
        </div>
    </div>
    )
}

export default Carousel;