import "./carousel.css";
import { useEffect, useRef, useState } from "react";
import {throttle} from "lodash";

const Carousel = ({data}:{data: Array<any>}) => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const sliderRef = useRef(null);
    const calculateProgressBar = (progressBar) => {
        progressBar.innerHTML = ""
        const itemCount = sliderRef.current.children.length;
        const itemsPerScreen = parseInt(getComputedStyle(sliderRef.current)
                                .getPropertyValue("--items-per-screen"));
        const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen);
        for (let i = 0; i < progressBarItemCount; i++) {
            const barItem = document.createElement("div")
            barItem.classList.add("progress-item")
            if (i === sliderIndex) {
                barItem.classList.add("active")
            }
            progressBar.append(barItem)
        }
    }

    useEffect(() => {
        document.querySelectorAll(".progress-bar").forEach(calculateProgressBar);
        const throttleProgressBar = throttle(() => {
        document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)
    },500);
 
    window.addEventListener("resize", throttleProgressBar);
    }, []);

        
    
    const handleForward = (e:any) => {
        const progressBar = e.target.closest(".row").
                            querySelector(".progress-bar");
        const itemCount = sliderRef.current.children.length;
        const itemsPerScreen = parseInt(getComputedStyle(sliderRef.current)
                                .getPropertyValue("--items-per-screen"));
        const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen);
        setTimeout(() => {
            progressBar.children[sliderIndex].classList.remove("active");
        }, 500);
        
        if (sliderIndex === progressBarItemCount - 1) {
            setSliderIndex(0);
            setTimeout(() => {
                progressBar.children[0].classList.add("active");
            }, 500);
            
        } else {
            setSliderIndex(sliderIndex + 1)
            setTimeout(() => {
                progressBar.children[sliderIndex + 1].classList.add("active"); 
            }, 500);
        }
    }

    const handleBackward = (e:any) => {
        const progressBar = e.target.closest(".row").
                            querySelector(".progress-bar");
        const itemCount = sliderRef.current.children.length;
        const itemsPerScreen = parseInt(getComputedStyle(sliderRef.current)
                                .getPropertyValue("--items-per-screen"));
        const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen);
        setTimeout(() => {
            progressBar.children[sliderIndex].classList.remove("active")
        }, 500
        );
        
        if (sliderIndex === 0) {
            setSliderIndex(progressBarItemCount - 1)
            setTimeout(() => {
                progressBar.children[progressBarItemCount - 1].
                classList.add("active")}, 500
            )       
        } else {
            setSliderIndex(sliderIndex - 1)
            setTimeout(() => {
                progressBar.children[sliderIndex - 1].classList.add("active");
            }, 500);
             
        } 
    }

    return(
        <div className="row">
        <div className="header">
            <h3 className="title text-white justify-between">Title</h3>
            <div className="progress-bar">
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