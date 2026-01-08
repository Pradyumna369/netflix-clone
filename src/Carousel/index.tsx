import "./carousel.css";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import throttle from "lodash/throttle";
import MovieCard from "../Videos/MovieCard";
import type { Movie } from "../Movie";

type CarouselProps = {
    genre: string;
    data: Movie[];
}

const Carousel = ({genre, data}: CarouselProps) => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [itemCount, setItemCount] = useState(0);
    const [itemsPerScreen, setItemsPerScreen] = useState(1);
    const progressBarItemCount = itemsPerScreen > 0 ? 
        Math.ceil(itemCount / itemsPerScreen): 0;
    const TRANSITION_MS = 500;

    // Initial layout measurement
    useLayoutEffect(() => {
        const slider = sliderRef.current
        if (!slider) return;
        setItemCount(slider.children.length);
        const value = parseInt(getComputedStyle(slider)
                                    .getPropertyValue("--items-per-screen"));
        setItemsPerScreen(Number.isNaN(value) ? 1 : value);
    },[])

    // Effect to handle window resizing
    useEffect(() => {
        const slider = sliderRef.current
        if (!slider) return;
        const handleResize = throttle(() => {
            const value = parseInt(
                getComputedStyle(slider).getPropertyValue("--items-per-screen")
            )
            setItemsPerScreen(Number.isNaN(value) ? 1 : value);
            if (sliderIndex >= progressBarItemCount) {
                setSliderIndex(Math.max(progressBarItemCount - 1, 0));
            }
        }, 200);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [sliderIndex, progressBarItemCount]);

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
        <div className="row mb-10">
        <div className="header">
            <p className="title text-white font-semibold text-xl">{genre}</p>
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
                data.map((movie,index) => (
                    <div key={index}>
                        <MovieCard movie={movie}/>
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