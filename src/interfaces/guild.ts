import { Snowflake } from "discord.js";

export interface guildSettingsInterface {
	id: Snowflake,
	guild_id: Snowflake,
	prefix: string,
	disabled_commands?: any,
	settings: {
		logs: {
			deleted_message: {
				enabled: boolean,
				channel?: Snowflake
			}
		},
		blacklisted_words: {
			enabled: boolean,
			list: string[]
		},
		language: string
	}
}