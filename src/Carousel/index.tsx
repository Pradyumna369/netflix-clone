import "./carousel.css";
import { useEffect, useRef, useState } from "react";
import throttle from "lodash/throttle";

const Carousel = ({data}:{data: string[]}) => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [itemCount, setItemCount] = useState(0);
    const [itemsPerScreen, setItemsPerScreen] = useState(1);
    const progressBarItemCount = itemsPerScreen > 0 ? 
        Math.ceil(itemCount / itemsPerScreen): 0;
    const TRANSITION_MS = 500;

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
        }, 100);
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
                className="handle left-handle"
                onClick={handleBackward}
                >
                    <div className="arrow">&#8249;</div>
                </button>
            <div className="slider"
                ref={sliderRef}
                style={{transform: `translateX(-${sliderIndex * 100}%)`}}
            >
                <img 
                src="https://dummyimage.com/450x300/ffff00/000&text=1"/>
                <img 
                src="https://dummyimage.com/400x210/ffff00/000&text=2"/>
                <img 
                src="https://dummyimage.com/400x200/ffff00/000&text=3"/>
                <img 
                src="https://dummyimage.com/400x200/ffff00/000&text=4"/>
                <img 
                src="https://dummyimage.com/200x260/ffff00/000&text=5"/>
                <img 
                src="https://dummyimage.com/205x200/ffff00/000&text=6"/>
                <img 
                src="https://dummyimage.com/200x220/ffffff/000&text=7"/>
                <img 
                src="https://dummyimage.com/200x260/ffffff/000&text=8"/>
                <img 
                src="https://dummyimage.com/205x200/ffffff/000&text=9"/>
                <img 
                src="https://dummyimage.com/200x220/ffffff/000&text=10"/>
                <img 
                src="https://dummyimage.com/200x260/ffffff/000&text=11"/>
                <img 
                src="https://dummyimage.com/205x200/ffffff/000&text=12"/>
                <img 
                src="https://dummyimage.com/400x220/ffffff/000&text=13"/>
            </div>
            <button 
            className="handle right-handle"
            onClick={handleForward}
            >
                <div className="arrow">&#8250;</div>
            </button>
        </div>
    </div>
    )
}

export default Carousel;