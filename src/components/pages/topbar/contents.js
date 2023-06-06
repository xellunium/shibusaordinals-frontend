import { imgPack } from "src/helpers/utils";

const contents = {
    imgs: {
        logo: imgPack("logos/logo.png", "logo"),
    },
    txts: {
        items: ["MINT", "‌ABOUT", "GALLERY"],
    },
    socials: [
        {
            url: "https://discord.com",
            logo: imgPack("logos/discord.png", "discord"),
        },
        {
            url: "https://www.twitter.com",
            logo: imgPack("logos/twitter.png", "twitter"),
        },
        {
            url: "https://www.youtube.com",
            logo: imgPack("logos/youtube.png", "youtube"),
        },
        {
            url: "https://www.medium.com",
            logo: imgPack("logos/medium.png", "medium"),
        },
    ],
};

export default contents;
