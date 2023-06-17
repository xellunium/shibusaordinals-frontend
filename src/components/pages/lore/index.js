import { useEffect, useState } from "react";
import classes from "./lore.module.css";
import contents from "./contents";
import { appendConditionalClass } from "src/helpers/utils";

const Lore = (props) => {
    const [animation, setAnimation] = useState(0);
    const appendAnimation = (...inputClasses) => {
        return appendConditionalClass(
            animation === 1,
            classes.Animated,
            ...inputClasses
        );
    };

    useEffect(() => {
        props.onLoad();
    }, []);

    useEffect(() => {
        /**
         * animation state manager
         */
        if (animation === 0 && props.active) {
            setAnimation(1);
        }
    }, [props.active, animation]);

    return (
        <section className={classes.Container} ref={props.reference}>
            <img
                className={classes.BackgroundImage}
                src={contents.imgs.background.src}
                alt={contents.imgs.background.alt}
            />
            <img
                className={appendAnimation(classes.LoreImage)}
                src={contents.imgs.lore.src}
                alt={contents.imgs.lore.alt}
            />
        </section>
    );
};

export default Lore;
