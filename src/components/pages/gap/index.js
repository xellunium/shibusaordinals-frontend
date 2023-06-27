import { useEffect } from "react";
import classes from "./gap.module.css";
import { useRef } from "react";

const Gap = (props) => {
    const mainRef = useRef(null);
    useEffect(() => {
        if (props.height) mainRef.current.style.height = `${props.height}vh`;
    }, []);
    return (
        <div className={classes.Section} ref={mainRef}>
            <div></div>
            <div></div>
        </div>
    );
};

export default Gap;
