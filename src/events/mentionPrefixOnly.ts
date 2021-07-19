import { Event, Events } from "@sapphire/framework";
import type { Message } from "discord.js";
import { getGuild } from "../lib/db";

export class UserEvent extends Event<Events.MentionPrefixOnly> {
	public async run(message: Message) {
		let guildData = await getGuild(message.guild.id);
		return message.channel.send(guildData.prefix ? `My prefix in this guild is: \`${guildData.prefix}\`` : "You do not need a prefix in DMs.");
	}
}
