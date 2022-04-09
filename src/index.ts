import {SharderEvents, ShardingManager} from "kurasuta";
import {join} from "path";
import {Client} from "./lib/client";
import {token, intents as configIntents} from "./private.json";
import {PREFIX} from "./config";
import {LogLevel} from "@sapphire/framework";

const sharder = new ShardingManager(join(__dirname, "kira"), {
    client: Client as any,
    clientOptions: {
        intents: configIntents,
        defaultPrefix: PREFIX,
        caseInsensitiveCommands: true,
        logger: {
            level: LogLevel.Warn
        },
        shards: "auto",
        // api: {
        //     auth: {
        //         id: "",
        //         secret: "",
        //         cookie: "SAPPHIRE_AUTH",
        //         redirect: "",
        //         scopes: ["identify"],
        //         transformers: []
        //     },
        //     prefix: "/",
        //     origin: "*",
        //     listenOptions: {
        //         port: 8345
        //     }
        // }
    },
    token: token
});

sharder.on(<SharderEvents.SHARD_READY>"shardReady", (id) => {
    console.log(`Shard-${id} is now ready.`);
});

sharder.on(<SharderEvents.SHARD_DISCONNECT>"shardDisconnect", (id) => {
    console.log(`Shard-${id} is now offline.`);
});

sharder.spawn();