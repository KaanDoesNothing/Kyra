import type { GuildMember, Message } from "discord.js";
import { Command, Args, CommandOptions, PermissionsPrecondition } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<CommandOptions>({
    preconditions: [new PermissionsPrecondition("BAN_MEMBERS")]
})

export class UserCommand extends Command {
	public async run(msg: Message, args: Args) {
                let member: GuildMember = await args.pick("member");
                let reason = await args.rest("string");

                if(!msg.member.permissions.has("BAN_MEMBERS") && !member.bannable) return msg.reply({content: `You can't ban the following user: ${member.user.tag}.`});

                await member.ban({reason: reason});

                return msg.reply({content: `${member.user.tag} has been banned.`});
	}
}
