import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import useVideo from "./store.ts";
import type StoreState from "./StoreState.ts";

const NAVIGATION_DELAY = 1000;

const CustomLink = ({to, children}:{to: string, children: React.ReactNode}) => {
    const navigate = useNavigate();
    const setNavigating = useVideo((state:StoreState) => state.setNavigating);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const delayAndGo = (e: React.MouseEvent) => {
        e.preventDefault();
        setNavigating(true);
        timeoutRef.current = setTimeout(() => {
            navigate(to)
            setNavigating(false)
        }, NAVIGATION_DELAY);
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