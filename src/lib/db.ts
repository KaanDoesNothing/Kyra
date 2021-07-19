import { Snowflake } from "discord.js";
import { r } from "rethinkdb-ts";
import { DB_NAME, PREFIX } from "../config";
import { guildSettingsInterface } from "../interfaces/guild";
import { userSettingsInterface } from "../interfaces/user";

export const db = r;

r.connectPool({ db: DB_NAME }).then(() => {
    ensureTableExists("guilds");
    ensureTableExists("users");
});

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

export const createUser = async (userID): Promise<userSettingsInterface> => {
    await r.table("users").insert({
        id: userID,
        user_id: userID,
        balance: 500,
        blacklisted: false,
        timeout_daily: 0
    }).run();
    
    return await getUser(userID);
}

export const updateUser = async (userEntry: userSettingsInterface) => {
    return await r.table("users").insert(userEntry, {conflict: "update"}).run();
}

export const getUser = async (userID: Snowflake): Promise<userSettingsInterface> => {
    return await db.table("users").get(userID).run() || await createUser(userID);
}

export const ensureTableExists = async (table) => {
    let tableExists = await r.tableList().contains(table).run();

    if(!tableExists) {
        await r.tableCreate(table).run();

        console.log(`DB - Table: ${table} has been created.`);
    }else {
        console.log(`DB - Table: ${table} exists.`);
    }
}