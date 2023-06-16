import React, { useEffect, useRef } from "react";
import classes from "./about.module.css";
import contents from "./contents";
import {
    appendConditionalClass,
    updateInnerHtmlFromFile,
} from "src/helpers/utils";
import cfg from "src/configs/about";
import topbarCfg from "src/configs/topbar";
import getBoundings from "src/helpers/dom/getBoundings/index";

const About = (props) => {
    const aboutRef = useRef(null);
    const teamRef = useRef(null);
    const cardsRef = useRef(null);

    const checkHeight = (idx) => {
        if (!cardsRef) return false;
        if (!cardsRef.current) return false;
        // if (!mobileView()) return false;
        return getBoundings(cardsRef, `${idx}`).top <= topbarCfg.height;
    };

    const mobileView = () => {
        return window.innerWidth < topbarCfg.mobileViewWidth;
    };

    const checkEnded = (idx) => {
        if (!cardsRef) return false;
        if (!cardsRef.current) return false;
        const boundings = getBoundings(cardsRef, `${idx}`);
        return (
            boundings.top + boundings.height <
            window.innerWidth *
                cfg.secondDivPercentage *
                cfg.imgWidthPercentage +
                topbarCfg.height
        );
    };

    const cards = () => {
        return contents.team.map((person, index) => {
            return (
                <div className={classes.Card} key={`card-${index}`}>
                    <div className={classes.CardTextWrapper}>
                        <p />
                        <p />
                    </div>
                    <div
                        className={appendConditionalClass(
                            checkHeight(index),
                            checkEnded(index)
                                ? classes.StickBottom
                                : classes.StickTop,
                            classes.CardImageWrapper
                        )}
                    >
                        <img src={person.img.src} alt={person.img.alt} />
                    </div>
                </div>
            );
        });
    };

    useEffect(() => {
        // fetching data: {texts and cards}
        updateInnerHtmlFromFile(contents.txts.about.title, aboutRef, "0");
        updateInnerHtmlFromFile(contents.txts.about.body, aboutRef, "1");
        updateInnerHtmlFromFile(contents.txts.team.title, teamRef, "0");
        updateInnerHtmlFromFile(contents.txts.team.body, teamRef, "1");
        for (let i in contents.team) {
            updateInnerHtmlFromFile(
                contents.team[i].title,
                cardsRef,
                `${i}-0-0`
            );
            updateInnerHtmlFromFile(
                contents.team[i].body,
                cardsRef,
                `${i}-0-1`
            );
        }
    }, []);

    return (
        <section className={classes.Container} ref={props.reference}>
            <img
                src={contents.imgs.background.src}
                alt={contents.imgs.background.alt}
                className={classes.Background}
            />
            <img
                src={contents.imgs.background.src}
                alt={contents.imgs.background.alt}
                className={classes.BackgroundPrim}
            />
            <div className={classes.Text} ref={aboutRef}>
                <p />
                <p />
            </div>
            <div className={classes.Text} ref={teamRef}>
                <p />
                <p />
            </div>
            <div className={classes.CardsHolder} ref={cardsRef}>
                {cards()}
            </div>
        </section>
    );
};

export default About;
