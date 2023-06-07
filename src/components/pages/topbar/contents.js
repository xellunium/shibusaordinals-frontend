import { imgPack } from "src/helpers/imgs";

const contents = {
    imgs: {
        logo: imgPack("logos/shibusa.png", "logo"),
    },
    txts: {
        items: ["HOME", "LORE", "GALLERY", "‌ABOUT"],
    },
    socials: [
        {
            url: "https://discord.com",
            logo: imgPack("logos/socials/discord.png", "discord"),
        },
        {
            url: "https://www.twitter.com",
            logo: imgPack("logos/socials/twitter.png", "twitter"),
        },
        {
            url: "https://www.youtube.com",
            logo: imgPack("logos/socials/youtube.png", "youtube"),
        },
        {
            url: "https://www.medium.com",
            logo: imgPack("logos/socials/medium.png", "medium"),
        },
    ],
};

export default contents;
