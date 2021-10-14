import {FastifyInstance, FastifyRequest} from "fastify";
import { Client } from "../lib/client";

export interface webServer extends FastifyInstance<any> {
    isAuthenticated: any;
}

export interface request extends FastifyRequest {
    locals: {
        client: Client
    },
    user: {
        user: {
            id: string
        }
    };
    jwtVerify: any;
}