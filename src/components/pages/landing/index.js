import React, { useEffect, useState } from "react";
import classes from "./landing.module.css";
import contents from "./contents";
import { appendConditionalClass } from "src/helpers/utils";

const Landing = (props) => {
    const [clicked, setClicked] = useState(false);

    // useEffect(() => {
    //     let ratio = 1920 / 1080;
    //     let bar = 80;
    //     let height = window.innerHeight - bar;
    //     let betterWidth = height * ratio;
    //     console.log("better width: " + betterWidth);
    //     if (window.innerWidth < betterWidth) {
    //         let minWidth = (0.3 * window.innerHeight - bar) * ratio;
    //         let x = Math.max(minWidth, window.innerWidth);
    //         let top = (window.innerHeight - bar - x / ratio) / 2;
    //         // lantern
    //         lanternOverlayRef.current.style.top = String(-top) + "px";
    //         // reaver
    //         riverOverlayRef.current.style.top = String(top) + "px";
    //     } else {
    //         // lantern
    //         lanternOverlayRef.current.style.top = "0";
    //         // reaver
    //         riverOverlayRef.current.style.top = "0";
    //     }
    //     console.log("lantern height: " + lanternOverlayRef.current.style.top);
    // }, [props.resized]);

    useEffect(() => {
        props.onLoad();
    }, []);

    const startMotion = () => {
        if (clicked) return;
        console.log("motion started");
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 5000);
    };

    return (
        <section className={classes.Section} ref={props.reference}>
            <div className={classes.Background}>
                <img
                    src={contents.imgs.backgrounds.main.src}
                    alt={contents.imgs.backgrounds.main.alt}
                />
                <img
                    alt={contents.imgs.redButton.alt}
                    src={contents.imgs.redButton.src}
                    className={appendConditionalClass(
                        clicked,
                        classes.Motion,
                        classes.Hidden
                    )}
                />
                <img
                    alt={contents.motions.redButton.alt}
                    src={contents.motions.redButton.src}
                    className={appendConditionalClass(
                        clicked,
                        classes.Hidden,
                        classes.RedButtonMotion
                    )}
                />

                <div className={classes.LeavesOverlay}>
                    <img
                        className={classes.MotionImage}
                        src={
                            clicked
                                ? contents.motions.leaves.src
                                : contents.imgs.backgrounds.staticLeaves.src
                        }
                        alt={contents.motions.leaves.alt}
                    />
                </div>
                <div className={classes.LanternOverlay}>
                    <img
                        className={classes.MotionImage}
                        src={
                            clicked
                                ? contents.motions.lantern.src
                                : contents.imgs.backgrounds.staticLantern.src
                        }
                        alt={contents.motions.lantern.alt}
                    />
                </div>
                <div className={classes.RiverOverlay}>
                    <img
                        className={classes.MotionImage}
                        src={
                            clicked
                                ? contents.motions.river.src
                                : contents.imgs.backgrounds.staticRiver.src
                        }
                        alt={contents.motions.river.alt}
                    />
                </div>
            </div>
            <div className={classes.Container}>
                <img
                    alt={contents.imgs.intro.alt}
                    src={contents.imgs.intro.src}
                    className={classes.TextImage}
                    onClick={startMotion}
                />
            </div>
        </section>
    );
};

export default Landing;
