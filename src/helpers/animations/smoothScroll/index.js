const smoothScroll = (params) => {
    let startTime = null;
    let initX = window.pageXOffset;
    let initY = window.pageYOffset;
    const { x = initX, y = initY, duration = 2000 } = params;

    const scrollOnNextTick = (timestamp) => {
        let ratio = (timestamp - startTime) / duration;
        if (ratio < 1.0) {
            console.log(`scrolling, ratio = ${ratio}`);
            window.scrollTo(
                initX + (x - initX) * ratio,
                initY + (y - initY) * ratio
            );
            requestAnimationFrame(scrollOnNextTick);
        } else {
            // completed
        }
    };

    requestAnimationFrame((timestamp) => {
        startTime = timestamp;
        scrollOnNextTick(timestamp);
    });
};

export default smoothScroll;
