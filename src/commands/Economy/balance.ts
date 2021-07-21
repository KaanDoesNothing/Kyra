import type { GuildMember, Message } from "discord.js";
import { Args, CommandOptions, PermissionsPrecondition } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { EmbedConstructor } from "../../lib/embed";
import { KiraCommand } from "../../lib/structures/command";
import { getUser, provider } from "../../lib/db";

@ApplyOptions<CommandOptions>({
    aliases: ["bal"]
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
        let user = await args.pick("user").catch(() => msg.author);

        let userSettings = await provider.get("users", user.id);

        console.log(userSettings)

        msg.channel.send({content: `${user.id === msg.author.id ? "You have" : `${user.tag} has`} ${userSettings.balance} coins.`});
	}
}
