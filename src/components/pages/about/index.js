import React, { useEffect, useRef } from "react";
import classes from "./about.module.css";
import contents from "./contents";
import { readFile } from "src/helpers/files/index";

const About = (props) => {
    const aboutRef = useRef(null);
    const cards = () => {
        return contents.team.map((person, index) => {
            return (
                <div className={classes.Card} key={`card-${index}`}>
                    <div className={classes.CardTextWrapper}>
                        <h3>{person.name}</h3>
                        <p>{person.txt}</p>
                    </div>
                    <div className={classes.CardImageWrapper}>
                        <img src={person.img.src} alt={person.img.alt} />
                    </div>
                </div>
            );
        });
    };

    useEffect(() => {
        // fetching data: {texts and cards}
        // fetching about texts
        console.log(aboutRef.current);
        readFile(contents.txts.about.title, (text) => {
            aboutRef.current.childNodes[0].innerHTML = text;
        });
        readFile(contents.txts.about.body, (text) => {
            aboutRef.current.childNodes[1].innerHTML = text;
        })

    }, []);

    return (
        <section className={classes.Container} ref={props.reference}>
            <img
                src={contents.imgs.background.src}
                alt={contents.imgs.background.alt}
                className={classes.Background}
            />
            <div className={classes.Text} ref={aboutRef}>
                <p/>
                <p/>
            </div>
            {/* <div className={classes.Text}>
                <h1>{contents.txts.team.title}</h1>
                <p>{contents.txts.team.body}</p>
            </div>
            <div className={classes.CardsHolder}>{cards}</div> */}
        </section>
    );
};

export default About;
