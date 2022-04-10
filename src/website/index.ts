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
import {KiraCommand} from "../lib/structures/command";
import {BitField} from "discord.js";

const secret = "amazingSecret";

export default (client: Client) => {
    const app = new koa();

    app.use(koaCors());
    app.use(koaBody());

    const router = new koaRouter();

    router.get("/", (ctx) => {
        ctx.body = {message: "Hmmm"}
    });

    router.get("/api/client/stats", async (ctx) => {
        ctx.body = {
            guilds: await client.shardManager.getGuildCount(),
            channels: await client.shardManager.getChannelCount(),
            users: await client.shardManager.getUserCount()
        }
    });

    router.get("/api/client/info", (ctx) => {
        let clientInfo = client.user.toJSON();
        let commands = client.stores.get("commands").map(command => {
            if((command as KiraCommand).hidden === true) return;

            // let userPermissions = [];
            //
            // let preconditions = command.preconditions;
            //
            // for (let i in preconditions) {
            //     let precondition = preconditions[i];
            //
            //     if(precondition.length) {
            //         precondition.forEach(precondition => {
            //            if(precondition.name === "UserPermissions") {
            //                console.log(precondition);
            //
            //                console.log(new BitField(precondition.context.permissions.bitfield));
            //            }
            //         });
            //     }
            //     // console.log(preconditions[i]);
            // }

            return {
                name: command.name,
                category: command.category,
                aliases: command.aliases,
                description: command.description
            }
        }).filter(command => command);

        // @ts-ignore
        ctx.body = {...clientInfo, commands: commands};
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

    router.post("/api/dashboard/getGuild", async (ctx) => {
        let guildID = ctx.request.body.id;

        let guild = client.guilds.cache.get(guildID);

        if(!guild) return ctx.body = {error: "Invalid guild"};

        ctx.body = {guild}
    });

    router.post("/api/dashboard/getUser", async (ctx) => {
        let userID = ctx.request.body.id;

        let user = await client.users.fetch(userID);

        if(!user) return ctx.body = {error: "Invalid guild"};

        ctx.body = {user}
    });


    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen(3005);
}