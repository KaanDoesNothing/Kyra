import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import {CommandOptions, Args, ChatInputCommand} from "@sapphire/framework";
import { Client } from "../../lib/client";
import { KiraCommand } from "../../lib/structures/command";

@ApplyOptions<CommandOptions>({
	preconditions: ["voiceOnly", "playerRequired"]
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {

		let musicManager = (this.container.client as Client).musicManager;
		let player = musicManager.manager.get(msg.guild.id);

        player.pause(true);

        msg.channel.send({content: `Music has been paused.`});
	}

	public registerApplicationCommands(registry: ChatInputCommand.Registry) {
		registry.registerChatInputCommand((builder) => builder.setName((this.name)).setDescription(this.description));
	}

	public async chatInputRun(interaction, context: ChatInputCommand.RunContext) {
		let musicManager = (this.container.client as Client).musicManager;
		let player = musicManager.manager.get(interaction.guild.id);

		player.pause(true);

		await interaction.reply({content: `Music has been paused.`});
	}
}
