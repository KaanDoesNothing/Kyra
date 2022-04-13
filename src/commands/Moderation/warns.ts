import type { GuildMember, Message, User } from "discord.js";
import {Args, CommandOptions, isErr, Result, UserError, UserPermissionsPrecondition} from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { KiraCommand } from "../../lib/structures/command";
import {GuildWarning} from "../../entities/guildWarning";
import locale from "../../lib/locale";
import {EmbedConstructor} from "../../lib/embed";

@ApplyOptions<CommandOptions>({
    preconditions: [new UserPermissionsPrecondition("MANAGE_MESSAGES")]
})

export class UserCommand extends KiraCommand {
    public async messageRun(msg: Message, args: Args) {
        let member: Result<GuildMember, UserError> = await args.pickResult("member");

        if(isErr(member)) {
            return msg.reply(locale.commands.args.user);
        }

        let warnings = await GuildWarning.find({where: {guild_id: msg.guild.id, user_id: member.value.user.id}, order: {createdAt: "DESC"}});

        if(warnings.length < 1) return msg.reply("No warnings were found.");

        let embed = new EmbedConstructor()
            .setTitle("Warnings for " + member.value.user.tag);

        let description = "";

        for (let i in warnings) {
            let warning = warnings[i];

            let author = await this.container.client.users.fetch(warning.author_id).catch(err => console.log("Couldn't fetch user."));

            description += `${new Date(warning.createdAt).toLocaleString()}, ${(author as User).tag}: ${warning.reason}\n`
        }

        embed.setDescription(description);

        return msg.channel.send({embeds: [embed]});
    }
}
