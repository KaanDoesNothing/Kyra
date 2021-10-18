import { Events, Listener } from "@sapphire/framework";
import type { Message } from "discord.js";
import { PREFIX } from "../config";
import { Client } from "../lib/client";
import server from "../website/index";

export class UserEvent extends Listener<typeof Events.ClientReady> {
	public async run() {
        server(this.container.client as Client);

		(this.container.client as Client).updateStatus();

		let musicManager = (this.container.client as Client).musicManager;

		musicManager.manager.init(this.container.client.user.id);
	}
}
