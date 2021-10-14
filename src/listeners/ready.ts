import { Events, Listener } from "@sapphire/framework";
import type { Message } from "discord.js";
import { PREFIX } from "../config";
import { Client } from "../lib/client";
import server from "../website/index";

export class UserEvent extends Listener<typeof Events.ClientReady> {
	public async run() {
        server(this.container.client as Client);

		this.container.client.user.setPresence({ activities: [{ name: `${PREFIX}Help, ${this.container.client.guilds.cache.size} Servers`, url: `https://www.twitch.tv/${this.container.client.user.username}`, type: 1 } ]});

		let musicManager = (this.container.client as Client).musicManager;

		musicManager.manager.init(this.container.client.user.id);
	}
}
