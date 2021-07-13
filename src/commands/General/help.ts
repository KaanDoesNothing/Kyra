import { Message, MessageEmbed } from "discord.js";
import { Command, CommandOptions } from "@sapphire/framework";
import { EmbedConstructor } from "../../lib/embed";

export class UserCommand extends Command {
	public async run(msg: Message, args) {
		const commands = this.context.client.stores.get("commands");

		let embed = new EmbedConstructor();

		commands.forEach(cmd => {
			embed.addField(cmd.name, cmd.description.length > 0 ? cmd.description : "None", true);
		});

		// let output = commands.map(cmd => `\`${cmd.name}\` `).join(" ");

		// embed.setDescription(output);

		msg.channel.send({embeds: [embed]});
	}
}
