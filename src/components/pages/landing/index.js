import React, { useEffect, useRef, useState } from "react";
import classes from "./landing.module.css";
import contents from "./contents";
import { appendConditionalClass } from "src/helpers/utils";

const Landing = (props) => {
    const lanternOverlayRef = useRef(null);
    const riverOverlayRef = useRef(null);
    const motionsRef = [useRef(null), useRef(null), useRef(null)];
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        let ratio = 1920 / 1080;
        let bar = 80;
        let height = window.innerHeight - bar;
        let betterWidth = height * ratio;
        console.log("better width: " + betterWidth);
        if (window.innerWidth < betterWidth) {
            let minWidth = (0.3 * window.innerHeight - bar) * ratio;
            let x = Math.max(minWidth, window.innerWidth);
            let top = (window.innerHeight - bar - x / ratio) / 2;
            // lantern
            lanternOverlayRef.current.style.top = String(-top) + "px";
            // reaver
            riverOverlayRef.current.style.top = String(top) + "px";
        } else {
            // lantern
            lanternOverlayRef.current.style.top = "0";
            // reaver
            riverOverlayRef.current.style.top = "0";
        }
        console.log("lantern height: " + lanternOverlayRef.current.style.top);
    }, [props.resized]);

    const startMotion = () => {
        if (clicked) return;
        console.log("motion started");
        setClicked(true);
        for (let ref of motionsRef) {
            ref.current.play()
        }
        setTimeout(() => {
            setClicked(false);
        }, 5000);
    };

    return (
        <section className={classes.Container}>
            <img
                alt={contents.imgs.background.alt}
                src={contents.imgs.background.src}
            />
            <img
                alt={contents.imgs.redButton.alt}
                src={contents.imgs.redButton.src}
                className={appendConditionalClass(
                    clicked,
                    classes.Motion,
                    classes.RedButton
                )}
                onClick={() => startMotion()}
            />
            <img
                alt={contents.imgs.intro.alt}
                src={contents.imgs.intro.src}
                className={classes.TextImage}
            />
            <div className={classes.Overlay} ref={lanternOverlayRef}>
                <div className={classes.MotionWrapper}>
                    <video
                        src={contents.motions.lantern.src}
                        ref={motionsRef[0]}
                        type="video/mp4"
                        muted={1}
                        autoPlay={0}
                        preload={1}
                    />
                </div>
            </div>
            <div className={classes.Overlay} ref={riverOverlayRef}>
                <div className={classes.MotionWrapper}>
                    <video
                        src={contents.motions.river.src}
                        ref={motionsRef[1]}
                        type="video/mp4"
                        muted={1}
                        autoPlay={0}
                        preload={1}
                    />
                </div>
            </div>
            <div className={classes.Overlay}>
                <div className={classes.MotionWrapper}>
                    <video
                        src={contents.motions.leaves.src}
                        ref={motionsRef[2]}
                        type="video/mp4"
                        muted={1}
                        autoPlay={0}
                        preload={1}
                    />
                </div>
            </div>
            {/* <div className={classes.Overlay}>
                <div className={classes.TextWrapper}>
                    <p>
                        {contents.txts.intro.first}
                        {contents.txts.intro.second}
                        {contents.txts.intro.third}
                    </p>
                </div>
            </div> */}
        </section>
    );
};

export default Landing;
