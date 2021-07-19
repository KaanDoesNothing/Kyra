export interface guildSettingsInterface {
	guild_id: string,
	prefix: string,
	disabled_commands: [command_name: string]
}