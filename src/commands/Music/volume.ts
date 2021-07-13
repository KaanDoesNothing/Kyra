import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { Client } from "../../lib/client";

@ApplyOptions<CommandOptions>({
	preconditions: ["voiceOnly"]
})

export class UserCommand extends Command {
	public async run(msg: Message, args: Args) {
        let volume = await args.rest("integer");

        if(!volume) return msg.reply
		
		let musicManager = (this.context.client as Client).musicManager;
		let player = musicManager.manager.get(msg.guild.id);

        if(!player) return msg.reply({content: "Music isn't playing."});

        player.setVolume(parseInt(volume as any));

        msg.channel.send({content: `Volume has been set too ${volume}`});
	}
}
