import { Message, MessageEmbed } from "discord.js";
import { CommandOptions } from "@sapphire/framework";
import { EmbedConstructor } from "../../lib/embed";
import { Command } from "../../lib/structures/command";

export class UserCommand extends Command {
	public run(msg: Message, args) {
		let categories: string[] = [];

		let embed = new EmbedConstructor();
		
		this.context.stores.get("commands").map((cmd: Command) => {
			if(categories.includes(cmd.category)) return;

			categories.push(cmd.category);
		});

		categories.forEach((category) => {
            let commandsLine = "";
            this.context.stores.get("commands").forEach(cmd => {
				//@ts-ignore
				if((cmd as Command).category !== category) return;
                commandsLine += (`\`${cmd.name}\` `);
            });
			

            embed.addField(category, commandsLine);
        });

		// commands.forEach(cmd => {
		// 	embed.addField(cmd.name, cmd.description.length > 0 ? cmd.description : "None", true);
		// });
		
		msg.channel.send({embeds: [embed]});
	}
}
