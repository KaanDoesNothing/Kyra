import fastify from "fastify";
import type { request } from "../interfaces/website";
import type { Client } from "../lib/client";

export default async (client: Client) => {
    const app = fastify({ logger: false });

    app.get("/api/stats", (req: request, res) => {
        res.send({
            guilds: client.guilds.cache.size,
            channels: client.guilds.cache.reduce((prev, next) => prev + next.channels.cache.size, 0),
            users: client.guilds.cache.reduce((prev, next) => prev + next.memberCount, 0)
        });
    });

    app.listen(3005).then(() => console.log("Server started")).catch(err => console.log("Web server already running!"));
}