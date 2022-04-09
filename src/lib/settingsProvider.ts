import type { Client } from "./client";
import {db} from "./db";
import { mergeDefault } from "@sapphire/utilities";
import {Guild} from "../entities/guild";
import {User} from "../entities/user";

import ioRedis from "ioredis";

let tables = {
    "guilds": Guild,
    "users": User
}

export class settingsProvider {
    public db: typeof db;
    private tables: string[];
    // private cache: [Map<string, object>?];
    private cache: any;
    private client: Client;
    constructor() {
        this.db = db;

        this.tables = [];

        this.cache = new ioRedis({port: 6888});

        this.cache.flushdb().then(console.log("Cache was flushed"));
    }

    public async _get(table: string, id: string) {
        let fetched = await tables[table].findOne({where: {id: id}});

        let merged = mergeDefault(this.tables[table](id), JSON.parse(fetched?.data || "{}"));

        return merged;
    }

    public async get(table: string, id: string) {
        let cached = await this.getCache(table, id);

        if(cached) return cached;

        let fetched = await this._get(table, id);

        await this.setCache(table, id, fetched);

        return fetched;
    }

    public async set(table: string, id: string, object) {
        let exists = await tables[table].findOne({where: {id: id}});

        if(exists) {
            let dbTable = tables[table];

            await dbTable.update({id}, {data: JSON.stringify(object)});
        }else {
            let dbTable = tables[table];
            let newRow = dbTable.create({id, data: JSON.stringify(mergeDefault(this.tables[table](id), object))});

            await newRow.save();
        }

        await this.setCache(table, id, object);

        await this.get(table, id);
    }

    public async ensure(table: string, id: string) {
        // let data = await tables[table].findOne({where: {id: id}});
        //
        // if(!data) {
        //     await this.set(table, id, this.tables[table](id));
        //
        //     return this.tables[table](id);
        // }else {
        //     return data;
        // }
    }

    public async addTable(table: string, default_data) {
        this.tables[table] = default_data;

        // this.cache[table] = new Map();
    }

    public async getCache(table: string, id: string) {
        let cached = await this.cache.get(`${table}.${id}`);

        console.log(cached);

        if(cached) {
            return JSON.parse(cached);
        }else {
            return;
        }
        // return this.cache[table].get(id);
    }

    public async setCache(table: string, id: string, data) {
        return await this.cache.set(`${table}.${id}`, JSON.stringify(data));
        // return this.cache[table].set(id, data);
    }

    public setClient(client: Client) {
        this.client = client;
    }
}