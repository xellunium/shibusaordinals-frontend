import React, { useState, useEffect, useRef } from "react";
import classes from "./app.module.css";
import Loading from "src/components/pages/loading";
import Landing from "src/components/pages/landing";
import Topbar from "src/components/pages/topbar";
import Gap from "src/components/pages/gap";
import Lore from "src/components/pages/lore";
import smoothScroll from "src/helpers/animations/smoothScroll";
import barCfg from "src/configs/topbar";
import Gallery from "src/components/pages/gallery";
import About from "src/components/pages/about";
import getBoundings from "src/helpers/dom/getBoundings";
import pageDetector from "src/helpers/pages/pageDetector";
// import Mint from "src/components/pages/mint";
// import Footer from "src/components/pages/footer";

const App = () => {
    const pageRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];
    const [page, setPage] = useState(0);
    const [resized, setResized] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [pageOffset, setPageOffset] = useState(0);
    const [loadingState, setLoadingState] = useState(0);
    const offset = useRef(0);
    const windowState = useRef(0);
    const mainDiv = useRef(null);

    const increaseState = () => {
        windowState.current += 1;
        setLoadingState(windowState.current);
    };

    useEffect(() => {
        let timeout, clickTimeout;
        const closure = pageDetector({
            mainPage: mainDiv,
            pageRefs: pageRefs,
            callback: (page, offset) => {
                // console.log(`in the callback: ${page} - ${offset}`)
                setPage(page);
                setPageOffset(offset);
            },
        });
        const onResize = () => {
            setResized(true);
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                setResized(false);
                clearTimeout(timeout);
            }, 500);
        };
        const onClicked = (e) => {
            if (e.y <= barCfg.height) {
                return;
            }
            setClicked(true);
            if (clickTimeout) clearTimeout(clickTimeout);
            clickTimeout = setTimeout(() => {
                setClicked(false);
                clearTimeout(clickTimeout);
            }, 500);
        };
        onResize();
        window.removeEventListener("resize", onResize);
        window.addEventListener("resize", onResize);
        window.removeEventListener("click", onClicked);
        window.addEventListener("click", onClicked);
        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("click", onClicked);
            closure();
        };
    }, []);

    const scrollPage = (index) => {
        // mainDiv.current.scrollTo(
        //     mainDiv.current.scrollLeft,
        //     pageRefs[index].current["offsetTop"] - barCfg.height
        // );
        smoothScroll({
            y: pageRefs[index].current["offsetTop"] - barCfg.height,
            duration: 1500,
            element: mainDiv.current,
        });
    };

    return (
        <>
            <Loading loadingState={loadingState} />
            <div className={classes.Container} ref={mainDiv}>
                <Topbar page={page} setPage={scrollPage} clicked={clicked} />
                <Landing
                    active={page === 0}
                    resized={resized}
                    page={page}
                    reference={pageRefs[0]}
                    onLoad={increaseState}
                />
                <Gap />
                <Lore
                    active={page === 1}
                    page={page}
                    reference={pageRefs[1]}
                    onLoad={increaseState}
                />
                <Gap />
                <Gallery
                    active={page === 2}
                    resized={resized}
                    page={page}
                    reference={pageRefs[2]}
                    onLoad={increaseState}
                />
                <Gap />
                <About
                    active={page === 3}
                    page={page}
                    reference={pageRefs[3]}
                    pageOffset={pageOffset}
                    onLoad={increaseState}
                />
                {/* <Mint active={page === 4} page={page} /> */}
                {/* <Footer /> */}
            </div>
        </>
    );
};

export default App;
