import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { CommandOptions, Args } from "@sapphire/framework";
import { Client } from "../../lib/client";
import { KiraCommand } from "../../lib/structures/command";

@ApplyOptions<CommandOptions>({
	preconditions: ["voiceOnly", "playerRequired"]
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {

		let musicManager = (this.container.client as Client).musicManager;
		let player = musicManager.manager.get(msg.guild.id);

        player.stop();

        msg.channel.send({content: "Track has been skipped."});
	}
}
