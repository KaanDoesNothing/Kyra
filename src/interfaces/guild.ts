import { Snowflake } from "discord.js";

export interface guildSettingsInterface {
	id: Snowflake,
	guild_id: Snowflake,
	prefix: string,
	disabled_commands?: any,
	modlog: {
		deleted_message: {
			enabled: boolean,
			channel?: Snowflake
		}
	}
}