import type { GuildMember, Message } from "discord.js";
import {Args, CommandOptions, isErr, Result, UserError, UserPermissionsPrecondition} from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { KiraCommand } from "../../lib/structures/command";
import {GuildWarning} from "../../entities/guildWarning";
import locale from "../../lib/locale";

@ApplyOptions<CommandOptions>({
    preconditions: [new UserPermissionsPrecondition("MANAGE_MESSAGES")]
})

export class UserCommand extends KiraCommand {
    public async messageRun(msg: Message, args: Args) {
        let member: Result<GuildMember, UserError> = await args.pickResult("member");

        if(isErr(member)) {
            return msg.reply(locale.commands.args.user);
        }

        let reason: Result<string, UserError> = await args.restResult("string");

        if(isErr(reason)) {
            return msg.reply(locale.commands.args.reason);
        }

        let newWarning = GuildWarning.create({guild_id: msg.guild.id, author_id: msg.author.id, user_id: member.value.user.id, reason: reason.value});

        await newWarning.save();

        return msg.reply({content: `<@${member.value.user.id}> has been warned.`});
    }
}
