import useVideo from "../store";
import type { Movie } from "../Movie";
import type StoreState from "../StoreState";

/**
 * Custom hook to batch multiple store selectors
 * Reduces duplication and improves readability
 */
export const useVideoStore = () => {
  const currentMovie = useVideo((state: StoreState) => state.currentMovie);
  const myList = useVideo((state: StoreState) => state.myList);
  const playVideo = useVideo((state: StoreState) => state.playVideo);
  const coordinates = useVideo((state: StoreState) => state.coordinates);
  const muted = useVideo((state: StoreState) => state.muted);
  const navigating = useVideo((state: StoreState) => state.navigating);
  const setCurrentMovie = useVideo((state: StoreState) => state.setCurrentMovie);
  const setPlayVideo = useVideo((state: StoreState) => state.setPlayVideo);
  const setCoordinates = useVideo((state: StoreState) => state.setCoordinates);
  const removeCoordinates = useVideo((state: StoreState) => state.removeCoordinates);
  const addToMyList = useVideo((state: StoreState) => state.addToMyList);
  const removeFromMyList = useVideo((state: StoreState) => state.removeFromMyList);
  const setMuted = useVideo((state: StoreState) => state.setMuted);
  const setNavigating = useVideo((state: StoreState) => state.setNavigating);

  // Derived state
  const isInMyList = myList.some((m: Movie) => m._id === currentMovie._id);

  return {
    currentMovie,
    myList,
    playVideo,
    coordinates,
    muted,
    navigating,
    isInMyList,
    setCurrentMovie,
    setPlayVideo,
    setCoordinates,
    removeCoordinates,
    addToMyList,
    removeFromMyList,
    setMuted,
    setNavigating,
  };
};
