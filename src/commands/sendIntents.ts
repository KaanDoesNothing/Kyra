import { ApplyOptions } from "@sapphire/decorators";
import { Intents, Message } from "discord.js";
import { Command, CommandOptions } from "@sapphire/framework";

export class UserCommand extends Command {
	public async run(msg: Message, args) {
		return msg.channel.send({content: JSON.stringify(Intents.ALL)});
	}
}
