import type { GuildMember, Message } from "discord.js";
import { Args, ClientPermissionsPrecondition } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";

@ApplyOptions<KiraCommandOptions>({
	preconditions: [new ClientPermissionsPrecondition("BAN_MEMBERS")]
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
				let member: GuildMember = await args.pick("member");
				let reason = await args.rest("string");

				if(!msg.member.permissions.has("BAN_MEMBERS") && !member.bannable) return msg.reply({content: `You can't ban the following user: ${member.user.tag}.`});

				await member.ban({reason: reason});

				return msg.reply({content: `${member.user.tag} has been banned.`});
	}
}
