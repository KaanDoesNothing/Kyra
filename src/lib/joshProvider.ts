import {db} from "../db";

interface optionsInterface {
    name: string,
    collection: string
}
export default class JoshProvider {
    name: string;
    collection: string;
    constructor(options: optionsInterface) {
        if(!options.name) throw new Error("Must provide options.name");

        this.name = options.name;
        this.collection = options.collection;

    }

    validateName
}