import type { GuildMember, Message } from "discord.js";
import { Args } from "@sapphire/framework";
import { KiraCommand } from "../../lib/structures/command";
import { getUser } from "../../lib/db";

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
        let userSettings = await getUser(msg.author.id);

        if(userSettings.timeout_daily > Date.now()) {
            
        }
	}
}
