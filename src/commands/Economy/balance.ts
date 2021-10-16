import type { Message } from "discord.js";
import { Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";

@ApplyOptions<KiraCommandOptions>({
    aliases: ["bal"]
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
        let user = await args.pick("user").catch(() => msg.author);

        let userSettings = await this.settings.get("users", user.id);

        msg.channel.send({content: `${user.id === msg.author.id ? "You have" : `${user.tag} has`} ${userSettings.balance} coins.`});
	}
}
