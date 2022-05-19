import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import {CommandOptions, Args, ChatInputCommand} from "@sapphire/framework";
import { Client } from "../../lib/client";
import { KiraCommand } from "../../lib/structures/command";
import { Player } from "erela.js";

@ApplyOptions<CommandOptions>({
	aliases: ["add"],
	preconditions: ["voiceOnly"]
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
		let musicManager = (this.container.client as Client).musicManager;
		
		let url = await args.rest("string");

		let res = await musicManager.manager.search(url, msg.author);

		let player: Player = musicManager.manager.get(msg.guild.id);

		if(!player) {
			player = musicManager.manager.create({
				guild: msg.guild.id,
				voiceChannel: msg.member.voice.channel.id,
				textChannel: msg.channel.id
			});
			
			player.connect();
		}

		player.queue.add(res.tracks[0]);
		msg.channel.send(`Added ${res.tracks[0].title} to the queue`);

		if (!player.playing && !player.paused && !player.queue.size) { 
			await player.play();
		}

		if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) {
			await player.play();
		}
	}

	public registerApplicationCommands(registry: ChatInputCommand.Registry) {
		registry.registerChatInputCommand((builder) => builder.setName((this.name)).setDescription(this.description).addStringOption((option => option.setName("song").setDescription("Provide a url or name!"))));
	}

	public async chatInputRun(interaction, context: ChatInputCommand.RunContext) {
		let musicManager = (this.container.client as Client).musicManager;

		let url = interaction.options.get("song") || interaction.options.get("play");

		let member = interaction.guild.members.cache.get(interaction.user.id);

		let res = await musicManager.manager.search(url.value, member.user);

		let player: Player = musicManager.manager.get(interaction.guild.id);

		if(!player) {
			player = musicManager.manager.create({
				guild: interaction.guild.id,
				voiceChannel: member.voice.channel.id,
				textChannel: interaction.channel.id
			});

			player.connect();
		}

		player.queue.add(res.tracks[0]);
		await interaction.reply(`Added ${res.tracks[0].title} to the queue`);

		if (!player.playing && !player.paused && !player.queue.size) {
			await player.play();
		}

		if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) {
			await player.play();
		}
	}
}
