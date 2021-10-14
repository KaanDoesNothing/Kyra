import fastify from "fastify";
import type { request, webServer } from "../interfaces/website";
import type { Client } from "../lib/client";
import { authClient } from "./oauth";

export default async (client: Client) => {
    const app = fastify({ logger: false });

    app.register(require("fastify-cors"));
    app.register(require("fastify-jwt"), {
        secret: "amazingSecret"
    });

    app.decorate("isAuthenticated", async (req: request, res) => {
        try {
            await req.jwtVerify();
            // console.log(req.user.user);
            await client.users.fetch(req.user.user.id);
        } catch (err) {
            res.send(err)
        }
    });

    app.get("/api/auth/info", async (req: request, res) => {
        let link = authClient.auth.link;

        return {
            link
        }
    });

    app.post("/api/auth/authenticate", async (req: request, res) => {
        const userKey: string | undefined = await authClient.getAccess((req.body as any).code).catch(err => undefined);

        if(!userKey) return {error: "Invalid code!"};

        const user: object | undefined = await authClient.users.fetch(userKey).catch(err => undefined);

        if(!user) return {error: "Couldn't fetch user!"};

        //@ts-ignore
        const token = app.jwt.sign({user});

        return {token};
    });

    app.get("/api/stats", async (req: request, res) => {
        return {
            guilds: client.guilds.cache.size,
            channels: client.guilds.cache.reduce((prev, next) => prev + next.channels.cache.size, 0),
            users: client.guilds.cache.reduce((prev, next) => prev + next.memberCount, 0)
        }
    });

    app.get("/api/client/info", async (req: request, res) => {
        return client.user.toJSON();
    });

    //@ts-ignore
    app.get("/api/auth/session", {preValidation: [app.isAuthenticated]}, async (req: request, res) => {
        return {session: req.user};
    });

    //@ts-ignore
    app.get("/api/auth/getUserGuilds", {preValidation: [app.isAuthenticated]}, async (req: Request, res) => {
        //@ts-ignore
        let guilds = client.guilds.cache.filter(guild => guild.members.fetch(req.user.user.id));

        return {guilds};

    });

    //@ts-ignore
    app.post("/api/auth/getGuild", {preValidation: [app.isAuthenticated]}, async (req: Request, res) => {
        //@ts-ignore
        let guild = client.guilds.cache.get((req.body as any).id);

        return {guild};
    });

    //@ts-ignore
    app.post("/api/auth/getUser", {preValidation: [app.isAuthenticated]}, async (req: Request, res) => {
        //@ts-ignore
        let user = await client.users.fetch((req.body as any).id);

        return {user};
    });


    app.listen(3005).then(() => console.log("Server started")).catch(err => console.log("Web server already running!"));
}