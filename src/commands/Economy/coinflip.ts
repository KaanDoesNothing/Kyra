import type { Message } from "discord.js";
import { Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";

@ApplyOptions<KiraCommandOptions>({
    aliases: ["cf"],
    hidden: true
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
        const amount = await args.pick("number").catch(err => msg.reply({content: "Provide the amount you want to bet."}));
        if(!amount) return;

        const flip = await args.pick("string").catch(err => msg.reply({content: "You have to provide your flip \`coinflip <heads/tails> <bet>\`."}));
        if(!flip) return;
        //@ts-ignore
        if (!["heads", "tails"].includes(flip)) return msg.reply("You have to provide your flip \`coinflip <heads/tails> <bet>\`.");

	}
}
