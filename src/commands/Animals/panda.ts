import { Message, MessageEmbed } from "discord.js";
import { Command, CommandOptions } from "@sapphire/framework";
import axios from "axios";

export class UserCommand extends Command {
	public async run(msg: Message, args) {
		let res = await axios.get("https://some-random-api.ml/img/panda");

		let embed = new MessageEmbed()
			.setImage(res.data.link);

		return msg.channel.send({ embeds: [embed] });
	}
}
