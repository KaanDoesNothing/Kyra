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
        let member: GuildMember = await args.pick("member");
        let role: Role = await args.pick("role");

        let reason = await args.rest("string");

        if(!msg.member.permissions.has("MANAGE_ROLES")) return msg.reply({content: `You don't have the permissions to do this.`});
        
        if(member.roles.cache.has(role.id)) return msg.reply(`Member already has the following role: ${role.name}.`);

        member.roles.add(role.id).then(() => msg.reply("Role has been added."));
	}

    public async remove(msg: Message, args: Args) {
        let member: GuildMember = await args.pick("member");
        let role: Role = await args.pick("role");

        let reason = await args.rest("string");

        if(!msg.member.permissions.has("MANAGE_ROLES")) return msg.reply({content: `You don't have the permissions to do this.`});
        
        if(!member.roles.cache.has(role.id)) return msg.reply(`Member doesn't have the following role: ${role.name}.`);

        member.roles.remove(role.id).then(() => msg.reply("Role has been removed."));
	}
}
