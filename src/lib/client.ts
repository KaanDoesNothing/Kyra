import { SapphireClient } from "@sapphire/framework";
import "@sapphire/plugin-api/register";
import "@sapphire/plugin-logger/register";
// import "@sapphire/plugin-i18next/register";
import { musicManager } from "./musicManager";

declare module "discord.js" {
    interface Client {
        musicManager: typeof musicManager
    }
}

export class Client extends SapphireClient {
    public musicManager;
    constructor(options) {
        super(options);

        this.musicManager = new musicManager(this);
    }
}