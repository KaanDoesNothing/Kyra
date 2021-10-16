import { ApplyOptions } from "@sapphire/decorators";
import type { Message, User } from "discord.js";
import { Args } from "@sapphire/framework";
import { Client } from "../../lib/client";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";
import { Player } from "erela.js";
import { EmbedConstructor } from "../../lib/embed";

const levels = {
	none: 0.0,
	low: 0.10,
	medium: 0.15,
	high: 0.25,
};

@ApplyOptions<KiraCommandOptions>({
	preconditions: ["voiceOnly", "playerRequired"]
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
		let value_fetched = await args.pickResult("string");
		let value = value_fetched.value;

		let musicManager = (this.container.client as Client).musicManager;
		let player: Player = musicManager.manager.get(msg.guild.id);

        let level = "none";
		if (value && value.toLowerCase() in levels) level = value.toLowerCase();

		const bands = new Array(3)
		.fill(null)
		.map((_, i) =>
			({ band: i, gain: levels[level] })
		);

		player.setEQ(...bands);

		return msg.reply({content: `set the bassboost level to ${level}`});
	}
}
