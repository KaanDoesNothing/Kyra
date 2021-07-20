import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { CommandOptions, Args } from "@sapphire/framework";
import { Client } from "../../lib/client";
import { KiraCommand } from "../../lib/structures/command";

@ApplyOptions<CommandOptions>({
	preconditions: ["voiceOnly", "playerRequired"]
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
        let volume = await args.rest("integer");

        if(!volume) return msg.reply
		
		let musicManager = (this.context.client as Client).musicManager;
		let player = musicManager.manager.get(msg.guild.id);

        player.setVolume(parseInt(volume as any));

        msg.channel.send({content: `Volume has been set too ${volume}`});
	}
}
