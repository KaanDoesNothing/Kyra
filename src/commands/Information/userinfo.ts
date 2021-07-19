import type { GuildMember, Message } from "discord.js";
import { Args, CommandOptions, PermissionsPrecondition } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { EmbedConstructor } from "../../lib/embed";
import { KiraCommand } from "../../lib/structures/command";

@ApplyOptions<CommandOptions>({
    aliases: ["ui"]
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
        let user = await args.pick("user").catch(() => msg.author);

        let isBot = user.bot ? "Yes" : "No";

        let member: GuildMember = msg.guild.members.cache.get(user.id);

        let embed = new EmbedConstructor()
        .setAuthor(`${user.tag}"s Info`, member.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(user.displayAvatarURL({ size: 512 }))
        .setColor("RANDOM")
        .addField("Username", user.tag, true)
        .addField("Nickname", member.nickname || user.username, true)
        .addField("Voice Channel", member.voice.channel ? member.voice.channel.name : "None", true)
        .addField("Bot", isBot, true)
        .setFooter("User created at:")
        .setTimestamp(member.user.createdAt)
        .setThumbnail(user.displayAvatarURL());

        msg.channel.send({embeds: [embed]});
	}
}
