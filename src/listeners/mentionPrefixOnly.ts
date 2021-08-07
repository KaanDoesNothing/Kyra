import { Events, Listener } from "@sapphire/framework";
import type { Message } from "discord.js";
import { provider } from "../lib/db";

export class UserEvent extends Listener<typeof Events.MessageCreate> {
	public async run(message: Message) {
		let guildData = await provider.get("guilds", message.guild.id);
		return message.channel.send(guildData.prefix ? `My prefix in this guild is: \`${guildData.prefix}\`` : "You do not need a prefix in DMs.");
	}
}
