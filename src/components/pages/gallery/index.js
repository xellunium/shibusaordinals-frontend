import classes from "./gallery.module.css";
import contents from "./contents";
import { useEffect, useState, useRef } from "react";
import cfg from "src/configs/gallery";
import {
    appendConditionalClass,
    getWidthsArray,
    getLeftsArray,
} from "src/helpers/utils";
import smoothTransitionArray from "src/helpers/animations/smoothTransitionArray";

const Gallery = (props) => {
    const imgRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];
    const [index, setIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };
    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const onTouchEnd = () => {
        if (animating.current) return;
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > cfg.minSwipeDistance) {
            actionRight();
        } else if (distance < -cfg.minSwipeDistance) {
            actionLeft();
        }
    };
    const [widths, setWidths] = useState(
        getWidthsArray({
            n: cfg.n,
            biggestRatio: cfg.biggestRatio,
            deltaRatio: cfg.deltaRatio,
        })
    );
    const animating = useRef(false);
    const currentImgs = useRef(contents.imgs.gallery.slice(0, cfg.n));
    const imgIndex = useRef(0);

    const [lefts, setLefts] = useState(
        getLeftsArray({
            n: cfg.n,
        })
    );

    useEffect(() => {
        for (let idx in imgRefs) {
            // console.log(`widths[${idx}] = ${widths[idx]}`);
            // console.log(`lefts[${idx}] = ${lefts[idx]}`);
            let component = imgRefs[idx].current;
            let width = Math.min(
                window.innerWidth * 0.9,
                window.innerHeight * 0.9
            );
            if (component) {
                component.style.width = `${widths[idx] * width}px`;
                component.style.height = `${widths[idx] * width}px`;
                component.style.left = `${lefts[idx] * 100}%`;
                let midOne = (index + Math.floor(cfg.n / 2)) % cfg.n;
                component.style.zIndex =
                    Math.floor(cfg.n / 2) -
                    Math.min(
                        Math.abs(idx - midOne),
                        cfg.n - Math.abs(idx - midOne)
                    );
            }
        }
    }, [widths, lefts, props.resized]);

    const onPress = (idx) => {
        if (animating.current) return;
        let midOne = (index + Math.floor(cfg.n / 2)) % cfg.n;
        if (idx === midOne) return;
        for (let i = 1; i <= Math.floor(cfg.n / 2); ++i) {
            if (idx === (midOne + i) % cfg.n) {
                actionRight();
                return;
            }
        }
        actionLeft();
    };

    const transition = (params) => {
        let { nextWidths, nextLefts } = params;
        // set the animating to true
        animating.current = true;

        smoothTransitionArray({
            initArr: lefts,
            destArr: nextLefts,
            duration: 500,
            updateFn: (arr) => {
                setLefts(arr);
            },
            closureFn: () => {
                animating.current = false;
            },
        });
        smoothTransitionArray({
            initArr: widths,
            destArr: nextWidths,
            duration: 500,
            updateFn: (arr) => {
                setWidths(arr);
            },
            closureFn: () => {
                animating.current = false;
            },
        });
    };

    const actionRight = () => {
        imgIndex.current = (imgIndex.current + 1) % cfg.totalImages;
        // currentImgs.current[index] = contents.imgs.gallery[imgIndex.current];
        setIndex((index + 1) % cfg.n);
        console.log(`current image index: ${imgIndex.current}`);
        transition({
            nextWidths: [
                widths[widths.length - 1],
                ...widths.slice(0, widths.length - 1),
            ],
            nextLefts: [
                lefts[lefts.length - 1],
                ...lefts.slice(0, lefts.length - 1),
            ],
        });
    };

    const actionLeft = () => {
        imgIndex.current =
            (imgIndex.current - 1 + cfg.totalImages) % cfg.totalImages;
        // currentImgs.current[(index + cfg.n - 1) % cfg.n] =
        // contents.imgs.gallery[(imgIndex.current + cfg.n - 1) % cfg.totalImages];
        setIndex((index - 1 + cfg.n) % cfg.n);
        transition({
            nextWidths: [...widths.slice(1), widths[0]],
            nextLefts: [...lefts.slice(1), lefts[0]],
        });
    };

    const elements = () => {
        // console.log(`index: ${index}`);
        return currentImgs.current.map((img, idx) => {
            // check if it's the midlle one
            // console.log(idx);
            let mainDiv = idx === (index + Math.floor(cfg.n / 2)) % cfg.n;
            return mainDiv ? (
                <img
                    className={classes.Image}
                    src={img.src}
                    alt={img.alt}
                    key={`img-${idx}`}
                    ref={imgRefs[idx]}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                />
            ) : (
                <img
                    className={appendConditionalClass(true, classes.Image, classes.Blur)}
                    src={img.src}
                    alt={img.alt}
                    key={`img-${idx}`}
                    ref={imgRefs[idx]}
                    onClick={() => onPress(idx)}
                />
            );
        });
    };

    return (
        <section className={classes.Container} ref={props.reference}>
            <img
                className={classes.ImageBackground}
                src={contents.imgs.background.src}
                alt={contents.imgs.background.alt}
            />
            <nav className={classes.Navigation}>{elements()}</nav>
        </section>
    );
};

export default Gallery;
