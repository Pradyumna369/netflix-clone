const VideoCard = ({col}:{col:number}) => {
  console.log("col is...", col);
    return (
    <>
        <div className={`absolute w-85 border border-white bg-black rounded-sm z-5 -translate-y-7.5 ${col !== 0 ? "-translate-x-15" : " "}` } >
            <video autoPlay loop muted className=" object-cover w-full h-full rounded-xl aspect-16/9">
                <source src="sample.mp4#t=10"/>
            </video>  
        </div>
    </>
  )
}

export default VideoCard