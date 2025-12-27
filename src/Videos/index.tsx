import VideoCard from "./VideoCard";
import ImageCard from "./ImageCard";
import {useState} from "react";
import useVideo from "../store";
import movies from "../Database";

const Videos = () => {
  const categories = ["crime", "Thrillers", "you may like"] as any;
  const currentElement = useVideo((state:any) => state.currentElement);
  const setCurrentElement = useVideo((state:any) => state.setCurrentElement); 

    return (
    <div>
        <ul>
            {
            Array.from(categories).map((name,row) => (
                <div className="text-white mb-10">
                    {name}
                    <div className="flex gap-5">
                        {
                Array.from({length:7}).map((id,index) => (
                    <div key={index} 
                    onMouseEnter={() => setCurrentElement(`${row} ${index}`)}
                    onMouseLeave={() =>  setCurrentElement("pause")}
                    >
                        
                        {
                            `${row} ${index}` === currentElement?
                                <VideoCard col={index}/>
                            :
                            <ImageCard/>
                        }
                        </div>
                    ))}
                    </div>
                </div>
            )
            )}
        </ul>
    </div>
  )
}

export default Videos