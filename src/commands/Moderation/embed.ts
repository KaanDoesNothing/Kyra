import type { GuildMember, Message } from "discord.js";
import { Args, CommandOptions, PermissionsPrecondition } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "../../lib/structures/command";

@ApplyOptions<CommandOptions>({
    strategyOptions: {
        options: ["title", "content", "color"]
    }
})

export class UserCommand extends Command {
	public async run(msg: Message, args: Args) {
        let title = args.getOption("title");
        let content = args.getOption("content");
        let color = args.getOption("color");

        console.log(title, content, color);
	}
}
