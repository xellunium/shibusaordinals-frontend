import React, { useState } from "react";
import classes from "./topbar.module.css";
import contents from "./contents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { appendConditionalClass } from "src/helpers/utils";

const Topbar = (props) => {
    const [burger, setBurger] = useState(0);

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
        props.setPage(pressedIndex);
        setBurger(0);
    };

    const orderBurger = () => {
        let order = [...Array(contents.txts.items.length).keys()];
        order = order.filter(function (value) {
            return value != props.page;
        });
        order = order.sort(() => Math.random() - 0.5);
        order = [props.page, ...order];
        return order;
    };

    return (
        <header className={classes.Header}>
            <img
                src={contents.imgs.logo.src}
                className={classes.Image}
                alt={contents.imgs.logo.alt}
            />
            <div className={appendBurger(classes.Container)}>
                <nav className={appendBurger(classes.Navigator)}>
                    <button
                        className={appendBurger(classes.Items, classes.BurgerIcon)}
                        onClick={() => burgerToggle()}
                    >
                        <FontAwesomeIcon icon={faBurger} />
                    </button>
                    {[...orderBurger()].map((value, index) => {
                        return (
                            <button
                                key={`btn-${index}`}
                                className={appendBurger(classes.Items)}
                                onClick={() => burgerPress(value)}
                            >
                                {contents.txts.items[value]}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
};

export default Topbar;
