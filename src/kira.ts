import { LogLevel } from "@sapphire/framework";
import { PREFIX } from "./config";

import { provider } from "./lib/db";
import { Client } from "./lib/client";
import { token, intents as configIntents } from "./private.json";
import { Message } from "discord.js";
import { guildSettingsInterface } from "./interfaces/guild";

const client = new Client({
	intents: configIntents,
	defaultPrefix: PREFIX,
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Trace
	},
	shards: "auto",
	fetchPrefix: async (msg: Message) => {
		let guildSettings: guildSettingsInterface = await provider.get("guilds", msg.guild.id);

		return guildSettings.prefix;
    },
	fetchLanguage: async (msg: Message) => {
		let guildSettings: guildSettingsInterface = await provider.get("guilds", msg.guild.id);

		return guildSettings.settings.language;
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
			port: 8345
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
