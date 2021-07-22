import type { Client } from "./client";
import {db} from "./db";
import xtend from "xtend";

export class settingsProvider {
    private db: typeof db;
    private tables: any;
    private cache: any;
    constructor() {
        this.db = db;

        this.tables = {};

        this.cache = {};
    }

    public async get(table: string, id: string) {
        if(!this.tables[table]) return console.log(`Table: ${table} Doesn't exist!`);

        let data = this.getCache(table, id) || await db.table(table).get(id).run();

        if(data) {
            let result = xtend(this.tables[table](id), data);

            this.setCache(table, id, result);

            return data;
        }else {
            let result = this.tables[table](id);

            this.setCache(table, id, result);

            return result;
        }
    }

    public async set(table: string, id: string, object) {
        this.setCache(table, id, object);

        return await db.table(table).insert(object, {conflict: "update"}).run();
    }

    public async ensure(table: string, id: string) {
        let data = await db.table(table).get(id).run();

        if(!data) {
            await this.set(table, id, this.tables[table](id));

            return this.tables[table](id);
        }else {
            return data;
        }
    }

    public addTable(table: string, object) {
        this.tables[table] = object;

        this.cache[table] = new Map();
    }

    public getCache(table: string, id: string) {
        return this.cache[table].get(id);
    }

    public setCache(table: string, id: string, data) {
        return this.cache[table].set(id, data);
    }
}