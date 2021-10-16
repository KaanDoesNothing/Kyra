import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { Args } from "@sapphire/framework";
import { Client } from "../../lib/client";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";
import { Player } from "erela.js";

@ApplyOptions<KiraCommandOptions>({
	preconditions: ["voiceOnly", "playerRequired"],
	hidden: true
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
		let musicManager = (this.container.client as Client).musicManager;
		let player: Player = musicManager.manager.get(msg.guild.id);

		let isRepeating = player.queueRepeat;

		if(isRepeating) {
			player.setQueueRepeat(false);
			msg.channel.send({content: "Queue repeating has been disabled."});
		}else {
			player.setQueueRepeat(true);
			msg.channel.send({content: "Queue repeating has been enabled."});
		}
	}
}
