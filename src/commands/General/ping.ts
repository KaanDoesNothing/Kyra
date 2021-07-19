import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { CommandOptions } from "@sapphire/framework";
import { Command } from "../../lib/structures/command";

@ApplyOptions<CommandOptions>({
	aliases: ["pong"],
	description: "Shows the bot latency."
})

export class UserCommand extends Command {
	public async run(msg: Message, args) {
		const message = await msg.channel.send("Ping...");
		return msg.channel.send(`Pong! Took: ${message.createdTimestamp - msg.createdTimestamp}ms!`);
	}
}
