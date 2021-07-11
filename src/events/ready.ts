import { Event, Events } from "@sapphire/framework";
import type { Message } from "discord.js";
import server from "../website/index";

export class UserEvent extends Event<Events.Ready> {
	public async run() {
        server(this.context.client);

		this.context.client.user.setPresence({ activities: [{ name: `=>Help, ${this.context.client.guilds.cache.size} Servers`, url: "https://www.twitch.tv/vortexbot", type: 1 } ]});
	}
}
