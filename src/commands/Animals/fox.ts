import { Message, MessageEmbed } from "discord.js";
import { CommandOptions } from "@sapphire/framework";
import axios from "axios";
import { KiraCommand } from "../../lib/structures/command";

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args) {
		let res = await axios.get("https://randomfox.ca/floof/");

		let embed = new MessageEmbed()
			.setImage(res.data.image);

		return msg.channel.send({ embeds: [embed] });
	}
}
