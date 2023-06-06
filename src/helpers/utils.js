const appendConditionalClass = (value, targetClass, ...baseClasses) => {
    return value ? [...baseClasses, targetClass].join(' ') : [...baseClasses].join(' ')
} 

const imgPack = (src, alt) => {
    return {
        src: require("../../assets/" + src),
        alt: alt
    };
}

const activePage = (props) => getPage(props) == props.selfPageName;

const getPage = (props) => props.page;

export { 
    appendConditionalClass,
    imgPack,
    activePage,
    getPage
};
