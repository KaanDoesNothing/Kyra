import { LogLevel, SapphireClient } from "@sapphire/framework";
import "@sapphire/plugin-logger/register";
import { Intents } from "discord.js";
import { BOT_TOKEN } from "./config";

import { db } from "./db";
import { guildSettingsInterface } from "./interfaces/guild";
import { Client } from "./lib/client";
import { token } from "./token.json";

const client = new SapphireClient({
	//@ts-ignore
	listenOptions: {
		port: 4000
    },
	intents: Intents.NON_PRIVILEGED,
	defaultPrefix: "=>",
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Trace
	},
	shards: "auto",
	fetchPrefix: async (msg) => {
		let guildSettings: any = (await db.table("guilds").filter({ guild_id: msg.guild.id }).run())[0];

		if (!guildSettings) {
			let newGuildSettings = { guild_id: msg.guild.id, prefix: "==>" };

			await db.table("guilds").insert(newGuildSettings).run();

			guildSettings = newGuildSettings;
		}

		return guildSettings.prefix;
    }
});

async function main() {
	try {
		client.logger.info("Logging in");
		await client.login(token);
		client.logger.info("Logged in");
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();
