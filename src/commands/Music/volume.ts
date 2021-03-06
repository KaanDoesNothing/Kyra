import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { Args } from "@sapphire/framework";
import { Client } from "../../lib/client";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";

@ApplyOptions<KiraCommandOptions>({
	preconditions: ["voiceOnly", "playerRequired"]
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
        let volume = await args.rest("integer");

        if(!volume) return msg.reply
		
		let musicManager = (this.container.client as Client).musicManager;
		let player = musicManager.manager.get(msg.guild.id);

        player.setVolume(parseInt(volume as any));

        msg.channel.send({content: `Volume has been set too ${volume}`});
	}
}
