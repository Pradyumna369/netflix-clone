import { Link, useNavigate } from "react-router-dom";
import useVideo from "./store.ts";

const CustomLink = ({to, children}:{to: string, children: any}) => {
    const navigate = useNavigate();
    const setNavigating = useVideo((state:any) => state.setNavigating);
    const delayAndGo = (e:any) => {
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