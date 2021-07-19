import { Command as defaultCommand, CommandOptions, PieceContext, PreconditionEntryResolvable } from "@sapphire/framework";
import { sep } from "path";

export abstract class Command extends defaultCommand {
    constructor(context: PieceContext, options: CommandOptions) {
        super(context);
        // if(!options.preconditions) options.preconditions = [];
        
        // (options.preconditions as PreconditionEntryResolvable[]).push({name: "Cooldown", context: {
        //     delay: 1000
        // }});
    }

    public get category() {
        const path = this.path;

        const splittedPath = path.split(sep);
        const finalPath = splittedPath.slice(splittedPath.indexOf("commands") + 1, -1);
        
        return finalPath[0];
    }
}