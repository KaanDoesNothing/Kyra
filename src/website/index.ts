import koa from "koa";
import koaRouter from "koa-router";
import koaCors from "@koa/cors";
import koaBody from "koa-body";
import jwt from "jsonwebtoken";
import koaJWT from "koa-jwt";
import {Client} from "../lib/client";
import {authClient} from "./oauth";
import {request} from "../interfaces/website";
import {stat} from "fs";

const secret = "amazingSecret";

export default (client: Client) => {
    const app = new koa();

    app.use(koaCors());
    app.use(koaBody());

    const router = new koaRouter();

    router.get("/", (ctx) => {
        ctx.body = {message: "Hmmm"}
    });

    router.get("/api/client/stats", (ctx) => {
        ctx.body = {
            guilds: client.guilds.cache.size,
            channels: client.guilds.cache.reduce((prev, next) => prev + next.channels.cache.size, 0),
            users: client.guilds.cache.reduce((prev, next) => prev + next.memberCount, 0)
        }
    });

    router.get("/api/client/info", (ctx) => {
        ctx.body = client.user.toJSON();
    });

    // router.use((ctx, next) => {
    //     ctx.body = "test";
    //     next();
    // });

    router.get("/api/auth/info", (ctx) => {
        let link = authClient.auth.link;

        ctx.body = {link: link}
    });

    router.post("/api/auth/authenticate", async (ctx) => {
        console.log(ctx.request.body);
        const userKey: string | undefined = await authClient.getAccess(ctx.request.body.code).catch(err => undefined);

        if(!userKey) return {error: "Invalid code!"};

        const user: any = await authClient.users.fetch(userKey).catch(err => undefined);
        const guilds: any = await authClient.guilds.fetch(userKey).catch(err => undefined);

        if(!user) return {error: "Couldn't fetch user!"};

        const finalGuilds = [];

        guilds.forEach(guild => {
            let cachedGuild = client.guilds.cache.get(guild.id);

            if(cachedGuild) finalGuilds.push(guild);
        });

        let cachedUser = await client.users.fetch(user.id);

        let finalUser = {...cachedUser, guilds: finalGuilds};

        const token = jwt.sign({user: finalUser}, secret);

        ctx.body = {token: token}
    });

    router.use(koaJWT({secret: secret}));

    router.get("/api/auth/session", (ctx) => {
        ctx.body = {session: ctx.state.user};
    });

    router.get("/api/auth/getUserGuilds", async (ctx) => {
        let userID = ctx.state.user.user.id;
        //@ts-ignore
        let guilds = client.guilds.cache.filter(guild => guild.members.cache.get(userID));

        // guilds = guilds.filter(guild => guild.members.cache.get(userID).permissions.has("ADMINISTRATOR"));

        ctx.body = {guilds}
    });


    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen(3005);
}