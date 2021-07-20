import { ApplyOptions } from "@sapphire/decorators";
import type { Message, User } from "discord.js";
import { CommandOptions, Args } from "@sapphire/framework";
import { Client } from "../../lib/client";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";
import { Player } from "erela.js";
import { EmbedConstructor } from "../../lib/embed";
import {Duration, TimeTypes} from "@sapphire/time-utilities";
import { millisToMinutesAndSeconds } from "../../lib/utils";

@ApplyOptions<KiraCommandOptions>({
	preconditions: ["voiceOnly"],
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
		let musicManager = (this.context.client as Client).musicManager;
		let player: Player = musicManager.manager.get(msg.guild.id);

        if(!player) return msg.reply({content: "Music isn't playing."});

        let queue = player.queue;

        let embed = new EmbedConstructor()
        .setTitle("Queue")
        .setDescription(queue.map((track, i) => `${i++} - ${track.title}`).join("\n"));

        msg.channel.send({embeds: [embed]});
	}
}
