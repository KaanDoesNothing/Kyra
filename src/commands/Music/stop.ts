import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { Client } from "../../lib/client";

@ApplyOptions<CommandOptions>({
	aliases: ["disconnect"],
	preconditions: ["voiceOnly"]
})

export class UserCommand extends Command {
	public async run(msg: Message, args: Args) {
		let musicManager = (this.context.client as Client).musicManager;
		let player = musicManager.manager.get(msg.guild.id);

        player.destroy();
	}
}
