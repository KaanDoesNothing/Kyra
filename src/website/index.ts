import fastify from "fastify";
import pointOfView from "point-of-view";
import httpProxy from "fastify-http-proxy";
import pug from "pug";
import { request } from "../interfaces/website";
import type { Client } from "../lib/client";

export default async (client: Client) => {
    const app = fastify({ logger: false });

    app.addHook("onRequest", (req: request, res, next) => {
        req.locals = {
            client
        };

        next();
    });

    app.register(pointOfView, {
        engine: {
            pug: pug
        },
        root: `${__dirname}/views`,
        viewExt: "pug"
    });

    app.get("/test", (req, res) => {
        res.send("working");
    })

    app.register(httpProxy, {
        upstream: "http://localhost:8345",
        prefix: "/api"
    });

    app.register(httpProxy, {
        upstream: "http://localhost:3000",
        prefix: "/"
    });

    app.listen(3005).then(() => console.log("Server started")).catch(err => console.log("Web server already running!"));
}