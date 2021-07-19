import { Message, MessageEmbed } from "discord.js";
import { CommandOptions } from "@sapphire/framework";
import axios from "axios";
import { Command } from "../../lib/structures/command";

export class UserCommand extends Command {
	public async run(msg: Message, args) {
		let res = await axios.get("http://random.dog/woof");

		let embed = new MessageEmbed()
			.setImage(`http://random.dog/${res.data}`);

		return msg.channel.send({ embeds: [embed] });
	}
}
