import fastify from "fastify";
import pointOfView from "point-of-view";
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

    app.get("/", (req: request, res) => {
        res.view("index", {data: req.locals});
    });

    app.listen(3000).then(() => console.log("Server started"));
}