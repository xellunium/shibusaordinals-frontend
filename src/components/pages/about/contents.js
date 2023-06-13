import { imgPack } from "src/helpers/imgs";
import {readFile} from "src/helpers/files";

const contents = {
    imgs: {
        background: imgPack("backgrounds/about.png", "about-bg"),
    },
    txts: {
        about: {
            title: "txts/about/title.htm",
            body: "txts/about/body.htm",
        },
        // team: {
        //     title: fileAsString("txts/team/title"),
        //     body: fileAsString("txts/team/body.html"),
        // },
    },
    team: [
        // {
        //     title: fileAsString("txts/cards/titles/0"),
        //     body: fileAsString("txts/cards/bodys/0"),
        //     img: imgPack("pfps/cards/0.png", "0"),
        // },
        // {
        //     title: fileAsString("txts/cards/titles/1"),
        //     body: fileAsString("txts/cards/bodys/1"),
        //     img: imgPack("pfps/cards/1.png", "1"),
        // },
        // {
        //     title: fileAsString("txts/cards/titles/2"),
        //     body: fileAsString("txts/cards/bodys/2"),
        //     img: imgPack("pfps/cards/2.png", "2"),
        // },
        // {
        //     title: fileAsString("txts/cards/titles/3"),
        //     body: fileAsString("txts/cards/bodys/3"),
        //     img: imgPack("pfps/cards/3.png", "3"),
        // },
        // {
        //     title: fileAsString("txts/cards/titles/4"),
        //     body: fileAsString("txts/cards/bodys/4"),
        //     img: imgPack("pfps/cards/4.png", "4"),
        // },
    ],
};

export default contents;
