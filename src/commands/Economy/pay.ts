import type { Message } from "discord.js";
import type { Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";
import type { userSettingsInterface } from "../../interfaces/user";

@ApplyOptions<KiraCommandOptions>({
    aliases: ["donate", "give"]
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
        let user = await args.pick("user");
        let amount: number = await args.pick("number");

        let userSettings: userSettingsInterface = await this.settings.get("users", msg.author.id);
        let mentionedUserSettings: userSettingsInterface = await this.settings.get("users", user.id);

        if(amount > userSettings.balance) return msg.reply({content: "You don't have enough money"});

        userSettings.balance -= amount;
        mentionedUserSettings.balance += amount;

        await this.settings.set("users", msg.author.id, userSettings);
        await this.settings.set("users", user.id, mentionedUserSettings);

        return msg.reply({content: `${amount} has been removed from your balance and has been given to ${user.tag}.`});
	}
}
