import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { Client } from "../../lib/client";

export class UserCommand extends Command {
	public async run(msg: Message, args: Args) {
		const channel = msg.member.voice.channel;
        if (!channel) return msg.reply({content: "You need to join a voice channel."});

		let musicManager = (this.context.client as Client).musicManager;
		let player = musicManager.manager.get(msg.guild.id);

        if(!player) return msg.reply({content: "Music isn't playing."});

        player.pause(false);

        msg.channel.send({content: `Music has been resumed.`});
	}
}
