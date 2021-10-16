import type { Message } from "discord.js";
import { Args, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { EmbedConstructor } from "../../lib/embed";
import { KiraCommand } from "../../lib/structures/command";

@ApplyOptions<CommandOptions>({
    aliases: ["si"]
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
        let owner = await msg.guild.fetchOwner();

        let embed = new EmbedConstructor(msg)
        .setThumbnail(msg.guild.iconURL())
        .addField("Name", msg.guild.name, true)
        .addField("ID", msg.guild.id, true)
        .addField("Owner", owner.user.tag, true)
        .addField("Owner ID", owner.user.id, true)
        .addField("Channels", msg.guild.channels.cache.size.toString(), true)
        .addField("Members", msg.guild.memberCount.toString(), true)
        .addField("Roles", msg.guild.roles.cache.size.toString(), true)
        .setFooter(`${msg.guild.members.cache.size} Members`);

        msg.channel.send({embeds: [embed]});
	}
}
