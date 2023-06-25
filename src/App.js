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
import getBoundings from "./helpers/dom/getBoundings/index";
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
        };
    }, []);

    useEffect(() => {
        const component = mainDiv.current;
        const onScroll = () => {
            let getOffset = (idx, type = "offsetTop") => {
                // console.log(`~~~ calling offset with idx=${idx} and type=${type}`)
                if (idx < 0) return 0;
                if (
                    idx >= pageRefs.length ||
                    !pageRefs[idx] ||
                    !pageRefs[idx].current
                )
                    return getOffset(idx - 1, "offsetBottom");
                let ret = pageRefs[idx].current["offsetTop"];
                if (type == "offsetBottom")
                    ret += pageRefs[idx].current["offsetHeight"];
                // console.log(`reading pageRefs[${idx}].${type} = ${ret}`)
                return ret;
            };
            offset.current = component.scrollTop;
            // console.log(getBoundings(mainDiv, '0'));
            // console.log(component.scrollTop)
            setPageOffset(component.scrollTop);
            // setOffset(window.pageYOffset);
            let pagePrim = 1e-12;
            for (let index of pageRefs.keys())
                if (pageRefs[index] && pageRefs[index].current) {
                    // console.log(`index==${index}`)
                    // console.log(`offset = ${offset.current}`)
                    // if (offset.current + 100 >= getOffset(index))
                    // setTopPage(index);
                    if (
                        offset.current * 2 >
                        getOffset(index) + getOffset(index - 1)
                    ) {
                        // console.log('INDEX = ' + index)
                        // console.log('INDEX+1 = ' + (index + 1))
                        // console.log('INDEX-1 = ' + (index - 1))
                        pagePrim =
                            (2 * offset.current -
                                getOffset(index) -
                                getOffset(index - 1)) /
                            (getOffset(index + 1) - getOffset(index - 1));
                        pagePrim += index;
                    }
                }
            // page.current = pagePrim;
            pagePrim = Math.max(0, Math.floor(pagePrim));
            // console.log(`current page is ${pagePrim}`);
            setPage(pagePrim);
            // setPage(pagePrim)
            // console.log(`page is now ${pagePrim}`)
            // if(Math.floor(pagePrim) != page) {
            //   setPage(Math.floor(pagePrim));
            // }
        };
        component.removeEventListener("scroll", onScroll);
        component.addEventListener("scroll", onScroll, { passive: true });
        return () => component.removeEventListener("scroll", onScroll);
    });

    const scrollPage = (index) => {
        // setPage(index);
        // console.log(pageRefs[index].current.childNodes[0])
        // console.log(pageRefs[index].current.childNodes[0].offsetTop)
        // console.log(getBoundings(pageRefs[index], "0"));
        // console.log(pageRefs[index].current.offsetTop)
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
