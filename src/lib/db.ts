import { Snowflake } from "discord.js";
import { r } from "rethinkdb-ts";
import { PREFIX } from "../config";
import { guildSettingsInterface } from "../interfaces/guild";

export const db = r;

r.connectPool({ db: "kira" });

export const createGuild = async (guildID: Snowflake): Promise<guildSettingsInterface> => {
    await r.table("guilds").insert({
        id: guildID,
        guild_id: guildID,
        prefix: PREFIX,
        disabled_commands: []
    }).run();
    
    return await getGuild(guildID);
}

export const getGuild = async (guildID: Snowflake): Promise<guildSettingsInterface> => {
    return await db.table("guilds").get(guildID).run() || await createGuild(guildID);
}

export const updateGuild = async (guildEntry: guildSettingsInterface) => {
    return await r.table("guilds").insert(guildEntry, {conflict: "update"}).run();
}