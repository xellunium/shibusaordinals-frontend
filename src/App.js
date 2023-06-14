import React, { useState, useEffect, useRef } from "react";
import classes from "./app.module.css";
import Topbar from "src/components/pages/topbar";
import Landing from "src/components/pages/landing";
import Lore from "src/components/pages/lore";
import smoothScroll from "src/helpers/animations/smoothScroll";
import barCfg from "src/configs/topbar";
import Gallery from "src/components/pages/gallery";
import About from "src/components/pages/about";
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
    const offset = useRef(0);

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
        const onClicked = () => {
            setClicked(true);
            if (clickTimeout) clearTimeout(clickTimeout);
            clickTimeout = setTimeout(() => {
                setClicked(false);
                clearTimeout(clickTimeout);
            });
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
            offset.current = window.pageYOffset;
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
            console.log(`current page is ${pagePrim}`);
            setPage(pagePrim);
            // setPage(pagePrim)
            // console.log(`page is now ${pagePrim}`)
            // if(Math.floor(pagePrim) != page) {
            //   setPage(Math.floor(pagePrim));
            // }
        };
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    });

    const scrollPage = (index) => {
        // setPage(index);
        smoothScroll({
            x: 0,
            y: pageRefs[index].current["offsetTop"] - barCfg.height,
            duration: 1000,
        });
    };

    return (
        <div className={classes.Container}>
            <Topbar page={page} setPage={scrollPage} />
            <Landing
                active={page === 0}
                resized={resized}
                page={page}
                reference={pageRefs[0]}
            />
            <Lore active={page === 1} page={page} reference={pageRefs[1]} />
            <Gallery
                active={page === 2}
                resized={resized}
                page={page}
                reference={pageRefs[2]}
            />
            {/* <About active={page === 0} page={page} reference={pageRefs[0]}/> */}
            {/* <Mint active={page === 4} page={page} /> */}
            {/* <Footer /> */}
        </div>
    );
};

export default App;
