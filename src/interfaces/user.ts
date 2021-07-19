import { Snowflake } from "discord.js";

export interface userSettingsInterface {
	id: Snowflake,
    user_id: Snowflake,
    balance: number,
    blacklisted: boolean,
    timeout_daily: number
}