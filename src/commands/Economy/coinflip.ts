import type { Message } from "discord.js";
import { Args, isErr } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";
import locale from "../../lib/locale";
import {userSettingsInterface} from "../../interfaces/user";


let options = ["heads", "tails"];

@ApplyOptions<KiraCommandOptions>({
    aliases: ["cf"]
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
        const flip = await args.pickResult("string");

        if(isErr(flip) || !options.includes(flip.value)) {
            return msg.reply("You have to provide your flip heads/tails.");
        }

        const amount = await args.pickResult("number");

        if(isErr(amount)) {
            return msg.reply(locale.commands.args.amount);
        }

        let settings: userSettingsInterface = await this.settings.get("users", msg.author.id);

        let generatedNumber = Math.floor(Math.random() * 2) === 0;

        let text = generatedNumber ? "heads" : "tails";

        let msgContent;

        if(text !== flip.value) {
            settings.balance-= amount.value;

            msgContent = `:x: You lost, ${amount.value} ${locale.economy.name} have been taken from your bank account.`;
        }else {
            settings.balance+= amount.value;

            msgContent = `:white_check_mark: You Won, ${amount.value} ${locale.economy.name} have been added to your bank account.`;
        }

        await this.settings.set("users", msg.author.id, settings);

        return msg.reply(msgContent);
	}
}
