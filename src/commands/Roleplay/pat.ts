import type { GuildMember, Message } from "discord.js";
import { Args } from "@sapphire/framework";
import { KiraCommand } from "../../lib/structures/command";
import { nekoClient } from "../../lib/nekosLife";
import { rolePlayEmbed } from "../../lib/embeds/roleplayEmbed";

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
        let user = await args.pick("user").catch(() => msg.author);

        let url = (await nekoClient.sfw.hug()).url;

        let embed = rolePlayEmbed(msg, user, "patted", url);

        msg.channel.send({embeds: [embed]});
	}
}
