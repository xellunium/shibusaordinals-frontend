const getBoundings = (reference, childMap) => {
    let children = childMap.split("-").map((value) => parseInt(value));
    if (!reference || !reference.current) return null;
    let stack = [reference.current];
    for (let child of children) {
        const component = stack.pop();
        stack.push(component.children[child]);
    }
    return stack.pop().getBoundingClientRect();
};

export default getBoundings;