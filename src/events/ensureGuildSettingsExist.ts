import { Event, Events, PieceContext } from "@sapphire/framework";
import type { Message } from "discord.js";
import { db } from "../db";

let alreadyChecked = [];

export class messageEvent extends Event<Events.Message> {
	public constructor(ctx: PieceContext) {
		super(ctx, { event: Events.Message, enabled: false });
	}

	public async run(msg: Message) {
		if (alreadyChecked.includes(msg.guild.id)) return;

		let guildSettings: any = (await db.table("guilds").filter({ guild_id: msg.guild.id }).run());

		if (!guildSettings) {
			let newGuildSettings = { guild_id: msg.guild.id, prefix: "$" };

			await db.table("guilds").insert(newGuildSettings).run();
		}

		alreadyChecked.push(msg.guild.id);
	}
}
