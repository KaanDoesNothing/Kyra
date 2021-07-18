import {db} from "../db";
import { r } from "rethinkdb-ts";

interface optionsInterface {
    name: string,
    collection: string,
    dbConfig: dbConfigInterface
}

interface dbConfigInterface {
    db: string
}

export default class JoshProvider {
    name: string;
    collection: string;
    auth: dbConfigInterface;
    db
    constructor(options: optionsInterface) {
        if(!options.name) throw new Error("Must provide options.name");

        this.name = options.name;
        
        if(!options.collection) {
            throw new Error("Must provide options.collection");
        }

        this.collection = options.collection;

        this.auth = options.dbConfig
    }

    async init() {
        await r.connectPool(this.auth);

        return true;
    }

    async get(key, path) {
        const data = await r.table(this.collection).filter({key})
    }
}