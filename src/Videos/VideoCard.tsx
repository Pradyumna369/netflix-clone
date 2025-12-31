import useVideo from "../store";
import {useState} from "react";
import {Link} from "react-router-dom";

const VideoCard = () => {
    const coordinates = useVideo((state:any) => state.coordinates);
    const setCurrentElement = useVideo((state:any) => state.setCurrentElement);
    const x = coordinates.get("x");
    const y = coordinates.get("y");
    const width = coordinates.get("width");
    const height = coordinates.get("height");
    const [startVideo, setStartVideo] = useState(false);
    setTimeout(() => setStartVideo(true), 500)
    const removeCoordinates = useVideo((state: any) => state.removeCoordinates);
    const currentMovie = useVideo((state:any) => state.currentMovie);
    const setPlayVideo = useVideo((state:any) => state.setPlayVideo);
    const setCurrentMovie = useVideo((state:any) => state.setCurrentMovie);
    const handleMouseLeave = () => {
        removeCoordinates();
        setPlayVideo(false);
        setCurrentElement("pause");
        setCurrentMovie({});
    };
    const addToMyList = useVideo((state:any) => state.addToMyList);
    const handleAddToMyList = () => {
        addToMyList(currentMovie);
    };

    if (x == null || y == null || width == null || height == null) return null;
    
    return (
    <>
        <div className="absolute  bg-black rounded-md z-50 overflow-hidden transition duration-200 ease-in-out hover:scale-120" 
            style={{
                top: y,
                left: x,
                width: width,
            }}
            onMouseLeave={handleMouseLeave}
        >   
            {
                startVideo ?
                <video autoPlay loop muted className=" object-cover w-full h-full aspect-[16/9]">
                    <source src={currentMovie.previewUrl}/>
                </video> :
                <img
                src={currentMovie.imgUrl}
                className="w-full h-full object-cover aspect-[16/9]"
            />
            }
            <div className="text-white flex mt-3 px-3 mb-3 ">
                <Link to="/play">
                    <img src="play-button-round-white-icon.png" className="w-5 h-5 mr-2"/>
                </Link>
                <button onClick={handleAddToMyList} className="cursor-pointer">
                    <img src="add-round-outline-white-icon.png" className="w-5 h-5 mr-2"/>
                </button>
                
                <img src="_.jpeg" className="w-5 h-5"/>
            </div>
            <div className="flex text-white px-3 text-xs items-center">
                <div className="border border-white-100 w-fit px-1">
                    {currentMovie.rating}
                </div>
                <div className="px-2">
                    {currentMovie.duration}
                </div>
                <div className="border border-white w-fit px-1 rounded-sm text-xs h-fit">
                    HD
                </div>
            </div>
            <div className="text-white text-sm flex text-xs pl-2 gap-1 mt-3 mb-3">
                {
                    currentMovie.tags.filter((_, index:number) => index < 2).map((tag: String, index:number) => {
                        return(
                            <div>
                                {`・${tag}`}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}

export default VideoCard