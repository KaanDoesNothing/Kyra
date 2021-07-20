import { LogLevel, SapphireClient } from "@sapphire/framework";
import "@sapphire/plugin-api/register";
import "@sapphire/plugin-logger/register";
import { Intents } from "discord.js";
import { BOT_TOKEN, PREFIX } from "./config";

import { createGuild, db, getGuild } from "./lib/db";
import { guildSettingsInterface } from "./interfaces/guild";
import { Client } from "./lib/client";
import { token, intents as configIntents } from "./private.json";

const client = new Client({
	intents: configIntents,
	defaultPrefix: PREFIX,
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Trace
	},
	shards: "auto",
	fetchPrefix: async (msg) => {
		let guildSettings = await getGuild(msg.guild.id);

		console.log(guildSettings);

		return guildSettings.prefix;
    },
	api: {
		auth: {
			id: "",
			secret: "",
			cookie: "SAPPHIRE_AUTH",
			redirect: "",
			scopes: ["identify"],
			transformers: []
		},
		prefix: "/",
		origin: "*",
		listenOptions: {
			port: 8340
		}
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
