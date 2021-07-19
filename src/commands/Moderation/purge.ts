import type { GuildMember, Message, TextChannel } from "discord.js";
import { Args, CommandOptions, PermissionsPrecondition } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "../../lib/structures/command";

@ApplyOptions<CommandOptions>({
    preconditions: [new PermissionsPrecondition("MANAGE_MESSAGES")]
})

export class UserCommand extends Command {
	public async run(msg: Message, args: Args) {
                let amount = await args.rest("number") + 1;

                if(!msg.member.permissions.has("MANAGE_MESSAGES")) return msg.reply({content: `You don't have the permissions to do this`});

                await msg.delete();

                let messages = await msg.channel.messages.fetch({ limit: amount });

                await (msg.channel as TextChannel).bulkDelete(messages.array().slice(0, amount));
                
                return msg.reply({content: `${amount} messages have been purged.`}).then((message) => {
                    setTimeout(() => {
                        message.delete();
                    }, 2500);
                });
	}
}
