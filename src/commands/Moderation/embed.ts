import type { GuildMember, Message } from "discord.js";
import { Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";

// @ApplyOptions<KiraCommandOptions>({
//     strategy: {
//         options: ["title", "content", "color"]
//     }
// })

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
        let title = args.getOption("title");
        let content = args.getOption("content");
        let color = args.getOption("color");

        console.log(title, content, color);
	}
}
