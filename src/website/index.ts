import fastify from "fastify";
import pointOfView from "point-of-view";
import httpProxy from "fastify-http-proxy";
import pug from "pug";
import { request } from "../interfaces/website";

export default async (client) => {
    const app = fastify({ logger: true });

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

    app.register(httpProxy, {
        upstream: "http://localhost:8340",
        prefix: "/api"
    });

    app.register(httpProxy, {
        upstream: "http://localhost:3000",
        prefix: "/"
    });
    // app.listen(3000).then(() => console.log("Server started"));
}