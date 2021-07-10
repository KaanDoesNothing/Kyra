import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { musicManager } from "../../lib/musicManager";

@ApplyOptions<CommandOptions>({
})

export class UserCommand extends Command {
	public async run(msg: Message, args: Args) {
		let url = await args.rest("string");
		console.log(url);
		musicManager.play(msg, url);
	}
}
