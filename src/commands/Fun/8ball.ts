import type { Message } from "discord.js";
import { CommandOptions } from "@sapphire/framework";
import { Command } from "../../lib/structures/command";

export class UserCommand extends Command {
	public async run(msg: Message, args) {
		let question = await args.rest("string").catch(err => {
			return;
		});

		if (!question) return msg.reply({ content: "Provide a question." });

		let replies = ["Yes", "No", "I didn't get that, please ask again", "Ask me later", "Of Course", "Absolutely not"]

		let result = Math.floor((Math.random() * replies.length));

		return msg.reply({ content: replies[result] });
	}
}
