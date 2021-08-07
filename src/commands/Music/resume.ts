import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { CommandOptions, Args, Precondition } from "@sapphire/framework";
import { Client } from "../../lib/client";
import { KiraCommand } from "../../lib/structures/command";

@ApplyOptions<CommandOptions>({
	preconditions: ["voiceOnly", "playerRequired"]
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
		let musicManager = (this.container.client as Client).musicManager;
		let player = musicManager.manager.get(msg.guild.id);

        player.pause(false);

        msg.channel.send({content: `Music has been resumed.`});
	}
}
