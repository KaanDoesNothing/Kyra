import { Message, MessageEmbed } from "discord.js";
import { Command, CommandOptions } from "@sapphire/framework";
import { EmbedConstructor } from "../../lib/embed";

export class UserCommand extends Command {
	public async run(msg: Message, args) {
		const commands = this.context.client.stores.get("commands");

		let embed = new EmbedConstructor();

		let categories = [];

		// temporary bad solutions because i'm bad at regex and categories aren't supported yet
		// commands.forEach(cmd => {
		// 	let args = cmd.path.split(`\\commands`)
		// 	let string = args[1];
		// 	let finalString = string.replace("\\", "").split("\\")[0];

		// 	if(!categories[finalString]) categories[finalString] = [];

		// 	categories[finalString].push(cmd);
		// });

		// categories.forEach(category => {
		// 	let commandsLine = "";
		// 	category.forEach(cmd => {
		// 		commandsLine+= (`\`${cmd.name}\` `);
		// 	});

		// 	embed.addField("test", commandsLine);
		// });
		commands.forEach(cmd => {
			embed.addField(cmd.name, cmd.description.length > 0 ? cmd.description : "None", true);
		});
		
		msg.channel.send({embeds: [embed]});
	}
}
