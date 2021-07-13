import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { Client } from "../../lib/client";

@ApplyOptions<CommandOptions>({
	aliases: ["add"]
})

export class UserCommand extends Command {
	public async run(msg: Message, args: Args) {
		let musicManager = (this.context.client as Client).musicManager;
		
		let url = await args.rest("string");

		let res = await musicManager.manager.search(url, msg.author);

		let player = musicManager.manager.create({
			guild: msg.guild.id,
			voiceChannel: msg.member.voice.channel.id,
			textChannel: msg.channel.id
		});

		player.connect();

		player.queue.add(res.tracks[0]);
		msg.channel.send(`Added ${res.tracks[0].title} to the queue`);

		if (!player.playing && !player.paused && !player.queue.size) { 
			player.play();
		}

		if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) {
			player.play();
		}
	}
}
