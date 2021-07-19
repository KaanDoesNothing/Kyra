import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { CommandOptions } from "@sapphire/framework";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";

@ApplyOptions<KiraCommandOptions>({
	aliases: ["pong"],
	description: "Shows the bot latency."
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args) {
		const message = await msg.channel.send("Ping...");
		return msg.channel.send(`Pong! Took: ${message.createdTimestamp - msg.createdTimestamp}ms!`);
	}
}
