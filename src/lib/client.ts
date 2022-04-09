import { SapphireClient } from "@sapphire/framework";
// import "@sapphire/plugin-api/register";
import "@sapphire/plugin-logger/register";
// import "@sapphire/plugin-i18next/register";
import { musicManager } from "./musicManager";
import {PREFIX} from "../config";
import {Message} from "discord.js";
import {guildSettingsInterface} from "../interfaces/guild";
import {provider} from "./db";

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

    public updateStatus() {
        this.user.setPresence({ activities: [{ name: `${PREFIX}Help, ${this.guilds.cache.size} Servers`, url: `https://www.twitch.tv/${this.user.username}`, type: 1 } ]});
    }

    fetchPrefix = async (msg: Message) => {
        let guildSettings: guildSettingsInterface = await provider.get("guilds", msg.guild.id);

        return guildSettings.prefix;
    };

    fetchLanguage = async (msg: Message) => {
        let guildSettings: guildSettingsInterface = await provider.get("guilds", msg.guild.id);

        return guildSettings.settings.language;
    }
}