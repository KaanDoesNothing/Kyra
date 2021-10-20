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

        const user: object | undefined = await authClient.users.fetch(userKey).catch(err => undefined);

        if(!user) return {error: "Couldn't fetch user!"};

        const token = jwt.sign({user}, "amazingSecret");

        ctx.body = {token: token}
    })

    router.use(koaJWT({secret: secret}));

    router.get("/api/auth/session", (ctx) => {
        ctx.body = {session: ctx.state.user};
    });

    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen(3005);
}