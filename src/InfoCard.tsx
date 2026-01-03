import type { Movie } from "./Movie";
import CustomLink from "./CustomLink";
import useVideo from "./store";

const InfoCard = ({movie}: {movie:Movie}) => {
    const myList = useVideo((state:any) => state.myList);
    const currentMovie = useVideo((state:any) => state.currentMovie);
    const present = myList.some((m: Movie) => m._id === currentMovie._id);
    const addToMyList = useVideo((state:any) => state.addToMyList);
    const removeFromMyList = useVideo((state: any) => state.removeFromMyList);
    const muted = useVideo((state: any) => state.muted);
    const setMuted = useVideo((state: any) => state.setMuted);

    const handleAddToMyList = () => {
        addToMyList(currentMovie);
    };

    const handleRemoveFromList = () => {
        removeFromMyList(currentMovie);
    };

  return (
   <div className="w-1/2 h-full rounded-md overflow-hidden">
        <div className=" relative w-full h-full">
            <video 
            autoPlay 
            muted={!muted}
            className=" object-cover w-full h-full aspect-[16/9]">
                            <source src={movie.previewUrl}/>
            </video> 
            <div className="absolute bottom-0 h-2/9 w-full bg-linear-to-t from-black to-transparent">
            </div>

            <div className="absolute bottom-12 left-10  w-full">
                <div>
                    <img
                        src="Netflix_Logo_RGB.png"
                        alt="NETFLIX"
                        className="w-19 -ml-2"
                    />
                </div>
                <div className="text-white font-sherif font-black tracking-tight text-2xl/8 leading-3">
                    {movie.title}
                </div>
                <div className="text-white flex mt-7 mb-3 items-center justify-between">
                    <div className="flex items-center ">
                        <CustomLink to="/play">
                            <div className="bg-white w-27 flex p-2 items-center rounded-sm text-black">
                                <img src="play.png" className="w-5 h-5 mx-3"/>
                                <button className="font-semibold">Play</button>
                            </div>
                        </CustomLink>
                        {
                            present ? 
                            <button onClick={handleRemoveFromList} className="cursor-pointer bg-white w-9 h-9 rounded-full mx-2 flex items-center justify-center">
                                <img src="check.png" className="w-8 h-8"/>
                            </button>
                            :
                            <button onClick={handleAddToMyList} className="cursor-pointer w-9 h-9 mx-2">
                                <img src="add-round-outline-white-icon.png" className="w-9 h-9"/>
                            </button>
                        }
                        <img src="like.png" className="w-9 h-9"/>
                    </div>
                    <div className="mr-20 opacity-50">
                        {
                                muted ? 
                                <button onClick={() => setMuted(false)} className={` w-10 h-10 flex items-center justify-center bg-black/50 rounded-full transition-opacity duration-300 ease-in-out opacity-80`}>
                                    <img src="speaker.png" className="w-8 h-8"/> 
                                </button>
                                :
                                <button onClick={() => setMuted(true)} className={`w-10 h-10 flex items-center justify-center bg-black/50 rounded-full transition-opacity duration-300 ease-in-out opacity-80`}>
                                    <img src="mute.png" className="w-8 h-8"/>
                                </button>
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="px-10 text-white items-baseline flex">
            <div className="min-w-5/8 pr-10">
                <div className="flex gap-3 text-sm text-gray-400">
                    <div>
                        {movie.year}
                    </div>
                    <div>
                        {movie.duration}
                    </div>
                    <div className="border border-white w-fit px-1 rounded-sm text-xs">HD</div>
                </div>
                <div className="text-sm mt-2 flex items-baseline">
                    <div className="border border-white-100 w-fit px-1">
                        {movie.rating}
                    </div>
                    <div className="text-white flex pl-2 gap-1">
                    {
                        movie.tags?.slice(0, 2).map((tag: String, index:number) => {
                            return(
                                <div key={index}>
                                    {`・${tag}`}
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                <div className="mt-10">
                    {
                        movie.description
                    }
                </div>
            </div>
            <div className="text-sm">
                <div id="cast" className="mb-3">
                    <span className="text-gray-500">Cast:</span>
                    {
                        movie.cast.map((member, index) => {
                            return " " + member + ",";
                        }
                        )
                    }
                    <span className="italic"> more</span>
                </div>
                <div id="genre" className="mb-3">
                    <span className="text-gray-500">Genre:</span>
                    {
                        movie.genres.map((genre, index) => {
                            if (index !== 0)
                                return ", " + genre;
                            else
                                return " " + genre;
                        }
                        )
                    }
                </div>
                <div id="tags">
                    <span className="text-gray-500">This show is:</span>
                    {
                        movie.tags.map((tag, index) => {
                            if (index !== 0)
                                return ", " + tag;
                            else
                                return " " + tag;
                        }
                        )
                    }
                </div>
            </div>

        </div>
   </div>
  )
}

export default InfoCard