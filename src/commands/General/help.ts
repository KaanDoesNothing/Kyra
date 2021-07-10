import type { Message } from "discord.js";
import { Command, CommandOptions } from "@sapphire/framework";

export class UserCommand extends Command {
	public async run(msg: Message, args) {
		const commands = this.context.client.stores.get("commands");

		let output = ``;

		commands.forEach(command => {
			output += `${command.name}: ${command.description}\n`;
		});

		msg.channel.send("```\n" + output + "\n```");
	}
}
