import { Event, Events } from "@sapphire/framework";
import type { Message } from "discord.js";
import { PREFIX } from "../config";
import { Client } from "../lib/client";
import server from "../website/index";

export class UserEvent extends Event<Events.Ready> {
	public async run() {
        server(this.context.client as Client);

		this.context.client.user.setPresence({ activities: [{ name: `${PREFIX}Help, ${this.context.client.guilds.cache.size} Servers`, url: `https://www.twitch.tv/${this.context.client.user.username}`, type: 1 } ]});

		let musicManager = (this.context.client as Client).musicManager;

		musicManager.manager.init(this.context.client.user.id);
	}
}
