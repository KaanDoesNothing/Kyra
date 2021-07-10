import { Client } from "./client";
import { Manager } from "@lavacord/discord.js";
import { Message } from "discord.js";

export let musicManager = new class musicManager {
    private client: Client;
    private players: Array<String>;
    private manager: Manager;


    constructor() {
        this.players = [];
    }

    setClient(client) {
        this.client = client;
        this.manager = new Manager(client, [{ host: "localhost", port: 8341, password: "0751", id: "Localhost" }]);
    }

    async play(msg: Message, url) {

    }

    launchEvents() {

    }

    init() {

    }
}