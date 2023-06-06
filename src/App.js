import React, { useState, useEffect } from "react";
import classes from "./app.module.css";
import Topbar from "src/components/pages/topbar";
import Animation from "src/components/pages/animation";
// import Lore from "src/components/pages/lore";
// import Gallery from "src/components/pages/gallery";
// import About from "src/components/pages/about";
// import Mint from "src/components/pages/mint";
// import Footer from "src/components/pages/footer";

const App = () => {
    const [page, setPage] = useState(0);
    return (
        <div className={classes.Container}>
            <Topbar page={page} setPage={setPage} />
            <Animation active={page === 0} page={page} />
            {/* <Lore active={page === 1} page={page} />
            <Gallery active={page === 2} page={page} />
            <About active={page === 3} page={page} />
            <Mint active={page === 4} page={page} />
            <Footer /> */}
        </div>
    );
};

export default App;
