import { LogLevel } from "@sapphire/framework";
import { PREFIX } from "./config";

import { provider } from "./lib/db";
import { Client } from "./lib/client";
import { token, intents as configIntents } from "./private.json";
import { Message } from "discord.js";
import { guildSettingsInterface } from "./interfaces/guild";
import { BaseCluster } from "kurasuta";

// declare module "@sapphire/pieces" {
// 	interface StoreRegistry {
// 		get<any>(key: any): StoreRegistry[K];
// 		has(key: Key): true;
// 	}
// }

// const client = new Client({
// 	intents: configIntents,
// 	defaultPrefix: PREFIX,
// 	caseInsensitiveCommands: true,
// 	logger: {
// 		level: LogLevel.Warn
// 	},
// 	shards: "auto",
// 	api: {
// 		auth: {
// 			id: "",
// 			secret: "",
// 			cookie: "SAPPHIRE_AUTH",
// 			redirect: "",
// 			scopes: ["identify"],
// 			transformers: []
// 		},
// 		prefix: "/",
// 		origin: "*",
// 		listenOptions: {
// 			port: 8345
// 		}
// 	}
// });
//
// async function main() {
// 	try {
// 		client.logger.info("Logging in");
// 		await client.login(token);
// 		client.logger.info("Logged in");
// 	} catch (error) {
// 		client.logger.fatal(error);
// 		client.destroy();
// 		process.exit(1);
// 	}
// };

// main();

export default class extends BaseCluster {
	protected async launch() {
		await this.client.login(token);

		try {
			this.client.logger.info("Logging in");
			await this.client.login(token);
			this. client.logger.info("Logged in");
		} catch (error) {
			this.client.logger.fatal(error);
			this.client.destroy();
			process.exit(1);
		}
	}
}