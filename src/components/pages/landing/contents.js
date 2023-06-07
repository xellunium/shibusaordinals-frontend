import { imgPack } from "src/helpers/imgs";

const contents = {
    imgs: {
        background: imgPack("backgrounds/landing.png", "landing"),
        redButton: imgPack("logos/button.png", "button"),
        intro: imgPack("backgrounds/intro.png", "intro"),
    },
    txts: {
        intro: {
            first: "  An artistic manifestation",
            second: "projecting the blossom of",
            third: "samurai's life on the Bitcoin"
        },
    },
    motions: {
        lantern: imgPack("motions/lantern.mp4", "lantern"),
        river: imgPack("motions/river.mp4", "river"),
        leaves: imgPack("motions/leaves.mp4", "leaves"),
    },
};

export default contents;
