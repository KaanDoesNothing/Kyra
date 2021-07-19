import { Snowflake } from "discord.js";

export interface guildSettingsInterface {
	id: Snowflake,
	guild_id: Snowflake,
	prefix: string,
	disabled_commands: [command_name: string]
}