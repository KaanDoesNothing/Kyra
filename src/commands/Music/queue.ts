import { ApplyOptions } from "@sapphire/decorators";
import type { Message, User } from "discord.js";
import { Args } from "@sapphire/framework";
import { Client } from "../../lib/client";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";
import { Player } from "erela.js";
import { EmbedConstructor } from "../../lib/embed";

@ApplyOptions<KiraCommandOptions>({
	preconditions: ["voiceOnly", "playerRequired"]
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
		let musicManager = (this.container.client as Client).musicManager;
		let player: Player = musicManager.manager.get(msg.guild.id);

        let queue = player.queue;

        let embed = new EmbedConstructor(msg)
        .setTitle("Queue")
        .setDescription(queue.map((track, i) => `${i++} - ${track.title}`).join("\n"));

        msg.channel.send({embeds: [embed]});
	}
}
