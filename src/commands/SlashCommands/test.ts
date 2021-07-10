import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { Command, CommandOptions } from "@sapphire/framework";

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
