import type { FastifyRequest } from "fastify";
import { Client } from "../lib/client";

export interface request extends FastifyRequest {
    locals: {
        client: Client
    }
}