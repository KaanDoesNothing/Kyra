import { Args, PieceContext, PreconditionEntryResolvable } from "@sapphire/framework";
import { SubCommandPluginCommand } from "@sapphire/plugin-subcommands";
import { Message } from "discord.js";
import { sep } from "path";
import { provider } from "../db";
import { EmbedConstructor } from "../embed";

export abstract class KiraCommand extends SubCommandPluginCommand {
    hidden?: boolean;
    owner?: boolean;
    options: KiraCommandOptions;
    constructor(context: PieceContext, options: KiraCommandOptions) {
        super(context, KiraCommand.handleOptions(options));

        this.hidden = options.hidden ?? false;
        this.owner = options.owner ?? false;
        this.description = this.description.length < 1 ? "None" : this.description;

        this.options = options;
    }

    public static handleOptions(options: KiraCommandOptions) {
        if(options.subCommands) {
            (options.subCommands as any).push({input: "show", default: true});
        }
        
        if(!options.preconditions) options.preconditions = [];

        (options.preconditions as PreconditionEntryResolvable[]).push("isBlacklisted");

        return options;
    }

    public show(msg: Message, args: Args) {
        let embed = new EmbedConstructor()
        .setTitle("Help")
        .setDescription(this.options.subCommands.filter(row => typeof(row) !== "object").map(row => row).join("\n"));

        return msg.channel.send({embeds: [embed]});
    }

    public get category() {
        const path = this.path;

        const splittedPath = path.split(sep);
        const finalPath = splittedPath.slice(splittedPath.indexOf("commands") + 1, -1);
        
        return finalPath[0];
    }

    public get settings() {
        return provider;
    }
}

export interface KiraCommandOptions extends SubCommandPluginCommand.Options {
    hidden?: boolean,
    owner?: boolean
}