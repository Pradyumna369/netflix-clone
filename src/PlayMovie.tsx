import useVideo from "./store"
const PlayMovie = () => {
    const currentMovie = useVideo((state:any) => state.currentMovie);
  return (
    <video autoPlay loop controls className=" object-cover w-full h-full aspect-[16/9]">
        <source src={currentMovie.previewUrl}/>
    </video>
  )
}

export default PlayMovie