import type { Client } from "./client";
import {db} from "./db";
import { mergeDefault } from "@sapphire/utilities";
import {Guild} from "../entities/guild";
import {User} from "../entities/user";

let tables = {
    "guilds": Guild,
    "users": User
}

export class settingsProvider {
    public db: typeof db;
    private tables: string[];
    private cache: [Map<string, object>?];
    private client: Client;
    constructor() {
        this.db = db;

        this.tables = [];

        this.cache = [];
    }

    public async _get(table: string, id: string) {
        let fetched = await tables[table].findOne({where: {id: id}});
        // console.log("fetched", fetched)

        let merged = mergeDefault(this.tables[table](id), JSON.parse(fetched?.data || "{}"));

        return merged;
    }

    public async get(table: string, id: string) {
        let cached = this.getCache(table, id);

        if(cached) return cached;

        let fetched = this._get(table, id);

        this.setCache(table, id, fetched);

        return fetched;

        // if(!this.tables[table]) return console.log(`Table: ${table} Doesn't exist!`);
        // if(!this.cache[table]) return console.log(`Cache: ${table} Doesn't exist!`);
        //
        // let data: any;
        //
        // if(this.getCache(table, id)) {
        //     data = this.getCache(table, id);
        // }else {
        //     let fetched = await tables[table].findOne({where: {id: id}}).catch(err => console.log(err)).then(res => res.data);
        //
        //     console.log(fetched);
        //
        //     if(fetched) {
        //         data = fetched;
        //     }else {
        //         let dbTable = tables[table];
        //         let newRow = dbTable.create({id, data: this.tables[table](id)});
        //
        //         await newRow.save();
        //
        //         data = this.tables[table](id)
        //     }
        // }
        //
        // let result = mergeDefault(this.tables[table](id), data ?? {});
        //
        // this.setCache(table, id, result);
        //
        // // console.log("Result", result);
        //
        // return result;
    }

    public async set(table: string, id: string, object) {
        console.log("Set", object);

        let exists = await tables[table].findOne({where: {id: id}});
        if(exists) {
            let dbTable = tables[table];

            await dbTable.update({id}, {data: JSON.stringify(object)});
        }else {
            let dbTable = tables[table];
            let newRow = dbTable.create({id, data: JSON.stringify(mergeDefault(this.tables[table](id), object))});

            await newRow.save();
        }

        await this.get(table, id);
        // this.setCache(table, id, object);
        //
        // return await tables[table].updateOne({where: {id: object.id}}, object);

        // return await db.table(table).insert(object, {conflict: "update", returnChanges: false}).run();
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

        this.cache[table] = new Map();   

        let tableExists = true

        if(!tableExists) {
            await this.db.tableCreate(table).run();
    
            console.log(`DB - Table: ${table} has been created.`);
        }else {
            console.log(`DB - Table: ${table} exists.`);
        }
    }

    public getCache(table: string, id: string) {
        return this.cache[table].get(id);
    }

    public setCache(table: string, id: string, data) {
        return this.cache[table].set(id, data);
    }

    public setClient(client: Client) {
        this.client = client;
    }
}