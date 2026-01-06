import useVideo from "./store"
const PlayMovie = () => {
    const currentMovie = useVideo((state:any) => state.currentMovie);
    const url = currentMovie.previewUrl || "main_clip.mp4"
  return (
    <video autoPlay loop controls className=" object-cover w-full h-full aspect-[16/9]">
        <source src={url}/>
    </video>
  )
}

export default PlayMovie