import { Args, PieceContext, PreconditionEntryResolvable } from "@sapphire/framework";
import { SubCommandPluginCommand } from "@sapphire/plugin-subcommands";
import { Message } from "discord.js";
import { sep } from "path";
import { provider } from "../db";
import { EmbedConstructor } from "../embed";

declare module "@sapphire/framework" {
    interface Preconditions {
        voiceOnly: never,
        playerRequired: never,
        isBlacklisted: never
    }
}

export abstract class KiraCommand extends SubCommandPluginCommand {
    hidden?: boolean;
    owner?: boolean;
    usage?: string;
    description: string;
    name: string;
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

        (options.preconditions as PreconditionEntryResolvable[]).push("isBlacklisted", "GuildOnly");

        return options;
    }

    public show(msg: Message, args: Args) {
        let embed = new EmbedConstructor(msg)
        .setTitle("Help")
        .setDescription(this.options.subCommands.filter(row => typeof(row) !== "object").map(row => row).join("\n"));

        return msg.channel.send({embeds: [embed]});
    }

    public get category() {
        return this.fullCategory[0];
    }

    public get settings() {
        return provider;
    }
}

export interface KiraCommandOptions extends SubCommandPluginCommand.Options {
    hidden?: boolean,
    owner?: boolean,
    usage?: string
}