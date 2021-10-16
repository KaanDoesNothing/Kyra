import type { GuildMember, Message, TextChannel } from "discord.js";
import { Args, ClientPermissionsPrecondition, CommandOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { KiraCommand } from "../../lib/structures/command";

@ApplyOptions<CommandOptions>({
    enabled: false,
    preconditions: [new ClientPermissionsPrecondition("MANAGE_MESSAGES")]
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
                let amount = await args.rest("number") + 1;

                if(!msg.member.permissions.has("MANAGE_MESSAGES")) return msg.reply({content: `You don't have the permissions to do this`});

                await msg.delete();

                //@ts-ignore
                let messages = await msg.channel.messages.fetch({ limit: amount });

                //@ts-ignore
                await (msg.channel as TextChannel).bulkDelete(messages.array().slice(0, amount));
                
                return msg.reply({content: `${amount} messages have been purged.`}).then((message) => {
                    setTimeout(() => {
                        message.delete();
                    }, 2500);
                });
	}
}
