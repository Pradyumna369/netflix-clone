import Header from "./Header"
import Videos from "./Videos"
import useVideo from "./store"

const MyList = () => {
    const myList = useVideo((state:any) => state.myList);
  return (
    <>
        <Header/>
        <div className='text-white'>MyList</div>
        <Videos data={myList}/>
    </>
  )
}

export default MyList