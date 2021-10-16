import type { Message, TextChannel } from "discord.js";
import { Args, ClientPermissionsPrecondition } from "@sapphire/framework";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<KiraCommandOptions>({
    preconditions: [new ClientPermissionsPrecondition("MANAGE_GUILD")]
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
        if(!msg.member.permissions.has("MANAGE_GUILD")) return msg.reply({content: `You don't have the permissions to do this!`});

        let time = await args.pick("number").catch(() => msg.reply({content: "You must provide the amount."}));
        if(!time) return;

        (msg.channel as TextChannel).setRateLimitPerUser(parseInt(time as any) * 1000);

        return msg.reply({content: `Slowmode has been set to ${time} seconds.`});
	}
}
