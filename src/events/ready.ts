import { Event, Events } from "@sapphire/framework";
import type { Message } from "discord.js";
import server from "../website/index";

export class UserEvent extends Event<Events.Ready> {
	public async run() {
        server(this.context.client);
	}
}
