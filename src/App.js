import React, { useState, useEffect } from "react";
import classes from "./app.module.css";
import Topbar from "src/components/pages/topbar";
import Landing from "src/components/pages/landing";
// import Lore from "src/components/pages/lore";
// import Gallery from "src/components/pages/gallery";
// import About from "src/components/pages/about";
// import Mint from "src/components/pages/mint";
// import Footer from "src/components/pages/footer";

const App = () => {
    const [page, setPage] = useState(0);
    const [resized, setResized] = useState(false);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        let timeout
        const onResize = () => {
            setResized(true)
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(() => {
                setResized(false)
                clearTimeout(timeout)
            }, 500)
        }
        const onClicked = () => {
            setClicked(true)
        }
        onResize()
        window.removeEventListener('resize', onResize)
        window.addEventListener('resize', onResize)
        window.removeEventListener('click', onClicked)
        window.addEventListener('click', onClicked)
        return () => {
            window.removeEventListener('resize', onResize)
            window.removeEventListener('click', onClicked)
        }
    }, [])

    return (
        <div className={classes.Container}>
            <Topbar page={page} setPage={setPage} />
            <Landing active={page === 0} resized={resized} page={page} />
            {/* <Lore active={page === 1} page={page} />
            <Gallery active={page === 2} page={page} />
            <About active={page === 3} page={page} />
            <Mint active={page === 4} page={page} />
            <Footer /> */}
        </div>
    );
};

export default App;
