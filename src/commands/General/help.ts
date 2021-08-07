import { Message, MessageEmbed } from "discord.js";
import { CommandOptions } from "@sapphire/framework";
import { EmbedConstructor } from "../../lib/embed";
import { KiraCommand } from "../../lib/structures/command";

export class UserCommand extends KiraCommand {
	public run(msg: Message, args) {
		let categories: string[] = [];

		let embed = new EmbedConstructor(msg);
		
		this.container.stores.get("commands").map((cmd: KiraCommand) => {
			if(categories.includes(cmd.category)) return;

			categories.push(cmd.category);
		});

		categories.forEach((category) => {
            let commandsLine = "";
            this.container.stores.get("commands").forEach(cmd => {
				if((cmd as KiraCommand).category !== category || (cmd as KiraCommand).hidden === true) return;
                commandsLine += (`\`${cmd.name}\` `);
            });

			if(commandsLine.length < 1) return;

            embed.addField(category, commandsLine);
        });
		
		msg.channel.send({embeds: [embed]});
	}
}
