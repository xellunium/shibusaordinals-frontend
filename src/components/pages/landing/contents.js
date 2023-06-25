import { imgPack } from "src/helpers/imgs";

const contents = {
    imgs: {
        redButton: imgPack("logos/button.png", "button"),
        intro: imgPack("backgrounds/intro.webp", "intro"),
        backgrounds: {
            main: imgPack("backgrounds/landing.webp", "landing"),
            staticLeaves: imgPack("backgrounds/landing/leaves.first.jpg", "leaves-static"),
            staticRiver: imgPack("backgrounds/landing/river.first.jpg", "river-static"),
            staticLantern: imgPack("backgrounds/landing/lantern.first.jpg", "lantern-static"),
        },
    },
    txts: {
        intro: {
            first: "  An artistic manifestation",
            second: "projecting the blossom of",
            third: "samurai's life on the Bitcoin"
        },
    },
    motions: {
        lantern: imgPack("motions/lantern.gif", "lantern"),
        river: imgPack("motions/river.gif", "river"),
        leaves: imgPack("motions/leaves.gif", "leaves"),
        redButton: imgPack("motions/redButton.gif", "button")
    },
};

export default contents;
