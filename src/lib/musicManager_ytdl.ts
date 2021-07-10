import { Client } from "./client";
import ytdl from "discord-ytdl-core";
import { Message } from "discord.js";

export let musicManager = new class musicManager {
    private client: Client;
    private players: Array<String>;


    constructor() {
        this.players = [];
    }

    setClient(client) {
        this.client = client;
    }

    async play(msg: Message, url) {
        /*let isValidURL = await ytdl.validateURL(url);

        let songData = await ytdl.getInfo(url);

        let connection = await msg.member.voice.channel();

        let stream = ytdl(url, {
            filter: "audioonly",
            opusEncoded: true,
            quality: "highest"
        });

        let dispatcher = connection.play(stream, {
            type: "opus"
        });

        console.log("Playing");

        dispatcher.on("finish", console.log);*/
    }

    launchEvents() {

    }

    init() {

    }
}