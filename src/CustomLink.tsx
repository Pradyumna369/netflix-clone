import { Link, useNavigate } from "react-router-dom";
import useVideo from "./store.ts";
import type StoreState from "./StoreState.ts";

const CustomLink = ({to, children}:{to: string, children: React.ReactNode}) => {
    const navigate = useNavigate();
    const setNavigating = useVideo((state:StoreState) => state.setNavigating);
    const delayAndGo = (e: React.MouseEvent) => {
        e.preventDefault();
        setNavigating(true);
        setTimeout(() => {
            navigate(to)
            setNavigating(false)
        }, 1000);
    }

    return (
        <>
            <Link to={to} onClick={(e) => delayAndGo(e)}>
                {children}
            </Link>
        </>
    )
}

export default CustomLink;