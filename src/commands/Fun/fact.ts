import type { GuildMember, Message } from "discord.js";
import { Args } from "@sapphire/framework";
import { KiraCommand } from "../../lib/structures/command";
import { nekoClient } from "../../lib/nekosLife";
import { rolePlayEmbed } from "../../lib/embeds/roleplayEmbed";

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
        let fact = (await nekoClient.sfw.fact()).fact;

        msg.channel.send({content: `Did you know that: ${fact}`});
	}
}
