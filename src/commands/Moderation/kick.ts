import type { GuildMember, Message } from "discord.js";
import { Args, ClientPermissionsPrecondition, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { KiraCommand } from "../../lib/structures/command";

@ApplyOptions<CommandOptions>({
    preconditions: [new ClientPermissionsPrecondition("KICK_MEMBERS")]
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
                let member: GuildMember = await args.pick("member");
                let reason = await args.rest("string");

                if(!msg.member.permissions.has("KICK_MEMBERS") && !member.kickable) return msg.reply({content: `You can't kick the following user: ${member.user.tag}.`});

                await member.kick();

                return msg.reply({content: `${member.user.tag} has been kicked.`});
	}
}
