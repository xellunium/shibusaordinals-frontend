/**
 *
 * conditional appending class to array of classes
 * @param {condition} value
 * @param {class that should be added if condition is true} targetClass
 * @param  {array of other default classes, added either way} baseClasses
 */
const appendConditionalClass = (value, targetClass, ...baseClasses) => {
    return value
        ? [...baseClasses, targetClass].join(" ")
        : [...baseClasses].join(" ");
};

const getWidthsArray = (params) => {
    let { n, biggestRatio, deltaRatio } = params;
    return [...Array(n).keys()].map((index) => {
        return (
            biggestRatio *
            (1 - deltaRatio * Math.abs(Math.floor(n / 2) - index))
        );
    });
};

const getLeftsArray = (params) => {
    let { n } = params;
    return [...Array(n).keys()].map((index) => {
        let m = Math.floor(n / 2);
        return 0.5 + (index - m) / n;
    });
};

export { appendConditionalClass, getWidthsArray, getLeftsArray };
