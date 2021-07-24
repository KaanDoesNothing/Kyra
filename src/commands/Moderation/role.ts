import type { GuildMember, Message, Role } from "discord.js";
import { Args, PermissionsPrecondition } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";

@ApplyOptions<KiraCommandOptions>({
    preconditions: [new PermissionsPrecondition("MANAGE_ROLES")],
    subCommands: ["add", "remove"]
})

export class UserCommand extends KiraCommand {
	public async add(msg: Message, args: Args) {
        let member_arg = await args.pickResult("member");
        if(member_arg.error) return msg.reply({content: "You need to mention someone."});
        let member = member_arg.value;

        let role_arg = await args.pickResult("role");
        if(role_arg.error) return msg.reply({content: "You need to mention someone."});
        let role = role_arg.value;
        
        if(!msg.member.permissions.has("MANAGE_ROLES")) return msg.reply({content: `You don't have the permissions to do this.`});
        
        if(member.roles.cache.has(role.id)) return msg.reply(`Member already has the following role: ${role.name}.`);

        member.roles.add(role.id).then(() => msg.reply("Role has been added."));
	}

    public async remove(msg: Message, args: Args) {
        let member_arg = await args.pickResult("member");
        if(member_arg.error) return msg.reply({content: "You need to mention someone."});
        let member = member_arg.value;

        let role_arg = await args.pickResult("role");
        if(role_arg.error) return msg.reply({content: "You need to mention someone."});
        let role = role_arg.value;

        if(!msg.member.permissions.has("MANAGE_ROLES")) return msg.reply({content: `You don't have the permissions to do this.`});
        
        if(!member.roles.cache.has(role.id)) return msg.reply(`Member doesn't have the following role: ${role.name}.`);

        member.roles.remove(role.id).then(() => msg.reply("Role has been removed."));
	}
}
