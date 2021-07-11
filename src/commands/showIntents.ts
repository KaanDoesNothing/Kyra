import { Message, MessageEmbed } from "discord.js";
import { Command, CommandOptions } from "@sapphire/framework";
import axios from "axios";
import { Intents } from "discord.js";

export class UserCommand extends Command {
	public async run(msg: Message, args) {
        msg.channel.send({content: Intents.NON_PRIVILEGED.toString()});
	}
}
