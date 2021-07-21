import { Message } from "discord.js";
import { Args, CommandOptions } from "@sapphire/framework";
import axios from "axios";
import { KiraCommand } from "../../lib/structures/command";
import { EmbedConstructor } from "../../lib/embed";

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
        let user = await args.pick("user").catch(() => msg.author);

        let url = `https://some-random-api.ml/canvas/gay?avatar=${user.displayAvatarURL({format: "png"})}`;
		let embed = new EmbedConstructor(msg)
			.setImage(url);

		return msg.channel.send({ embeds: [embed] });
	}
}
