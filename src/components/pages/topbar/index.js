import React, { useEffect, useState } from "react";
import classes from "./topbar.module.css";
import contents from "./contents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { appendConditionalClass } from "src/helpers/utils";

const Topbar = (props) => {
    const [burger, setBurger] = useState(0);
    const [items, setItems] = useState([
        ...Array(contents.txts.items.length).keys(),
    ]);

    const appendBurger = (...inputClasses) => {
        return appendConditionalClass(
            burger === 1,
            classes.Responsive,
            ...inputClasses
        );
    };

    const burgerToggle = () => {
        setBurger(1 - burger);
    };

    const burgerPress = (pressedIndex) => {
        console.log(`pressed the #${pressedIndex} from the list`);
        props.setPage(pressedIndex);
        setBurger(0);
    };

    useEffect(() => {
        if (props.page >= items.length) return;
        setItems([
            props.page,
            ...items.filter((value) => value !== props.page),
        ]);
    }, [props.page]);

    useEffect(() => {
        if (props.clicked) {
            setBurger(0);
        }
    }, [props.clicked]);

    const elements = () => {
        return items.map((value, index) => {
            return (
                <button
                    key={`btn-${index}`}
                    className={appendBurger(classes.Items)}
                    onClick={() => burgerPress(value)}
                >
                    {contents.txts.items[value]}
                </button>
            );
        });
    };

    return (
        <header className={classes.Header}>
            <div className={classes.OpacityBackground} />
            <div className={classes.BlurBackground} />
            <div className={appendBurger(classes.Container)}>
                <img
                    src={contents.imgs.logo.src}
                    alt={contents.imgs.logo.alt}
                    className={appendBurger(classes.Image)}
                />
                <nav className={appendBurger(classes.Navigator)}>
                    <button
                        className={appendBurger(
                            classes.Items,
                            classes.BurgerIcon
                        )}
                        onClick={burgerToggle}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    {elements()}
                </nav>
            </div>
        </header>
    );
};

export default Topbar;
