import { Command, CommandOptions, PieceContext, PreconditionEntryResolvable } from "@sapphire/framework";
import { sep } from "path";

export abstract class KiraCommand extends Command {
    hidden?: boolean;
    owner?: boolean;
    constructor(context: PieceContext, options: KiraCommandOptions) {
        super(context, options);

        this.hidden = options.hidden ?? false;
        this.owner = options.owner ?? false;
        
        if(this.description.length < 1) this.description = "None";
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

export interface KiraCommandOptions extends CommandOptions {
    hidden?: boolean,
    owner?: boolean
}