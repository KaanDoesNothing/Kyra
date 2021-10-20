import koa from "koa";
import koaRouter from "koa-router";
import {Client} from "../lib/client";
import {authClient} from "./oauth";
import {request} from "../interfaces/website";

export default (client: Client) => {
    const app = new koa();

    const router = new koaRouter();

    router.get("/", (ctx) => {
        ctx.body = {message: "Hmmm"}
    });

    router.get("/api/auth/info", (ctx) => {
        let link = authClient.auth.link;

        ctx.body = {link: link}
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

    router.use((ctx, next) => {
        ctx.body = "test";
        next();
    });

    router.get("/api/auth/session", (ctx) => {
        ctx.body = {message: "none"}
    });

    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen(3005);
}