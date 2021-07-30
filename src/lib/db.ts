import { Snowflake } from "discord.js";
import { r } from "rethinkdb-ts";
import { DB_NAME, PREFIX } from "../config";
import { guildSettingsInterface } from "../interfaces/guild";
import { userSettingsInterface } from "../interfaces/user";
import {settingsProvider} from "./settingsProvider";

export const db = r;

r.connectPool({ db: DB_NAME }).then(() => {
    provider.addTable("guilds", (id) => defaultGuildSchema(id));
    provider.addTable("users", (id) => defaultUserSchema(id));
});

export const provider = new settingsProvider();

export const defaultGuildSchema = (guildID: Snowflake): guildSettingsInterface => {
    return {
        id: guildID,
        guild_id: guildID,
        prefix: PREFIX,
        disabled_commands: [],
        settings: {
            logs: {
                deleted_message: {
                    enabled: false,
                    channel: "0"
                } 
            },
            blacklisted_words: {
                enabled: true,
                list: []
            },
            language: "en-US"
        }
    }
}

export const defaultUserSchema = (userID: Snowflake): userSettingsInterface => {
    return {
        id: userID,
        user_id: userID,
        balance: 500,
        blacklisted: false,
        timeout_daily: 0
    }
}