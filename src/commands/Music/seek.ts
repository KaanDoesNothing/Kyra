import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { CommandOptions, Args } from "@sapphire/framework";
import { Client } from "../../lib/client";
import { KiraCommand } from "../../lib/structures/command";
import { Player } from "erela.js";

@ApplyOptions<CommandOptions>({
	preconditions: ["voiceOnly", "playerRequired"]
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
        let time_arg = await args.pickResult("number");

        if(time_arg.error) return msg.reply({content: "You must provide a number."});

		let musicManager = (this.context.client as Client).musicManager;
		let player: Player = musicManager.manager.get(msg.guild.id);

        player.seek(time_arg.value * 1000);

        msg.channel.send({content: `Music has been seeked.`});
	}
}
