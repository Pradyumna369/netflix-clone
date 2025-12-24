import {create} from 'zustand';

const useVideo = create((set) => ({
    currentElement: "",
    setCurrentElement: (element: string) => set(({currentElement:element})) 
})
)

export default useVideo;