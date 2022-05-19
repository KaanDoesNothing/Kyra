import {ChatInputCommand, Identifiers, Precondition, PreconditionResult} from "@sapphire/framework";
import {CommandInteraction, Message} from "discord.js";
import type { Player } from "erela.js";
import type { Client } from "../lib/client";

export class CorePrecondition extends Precondition {
    public messageRun(msg: Message): PreconditionResult {
        let musicManager = (this.container.client as Client).musicManager;
        let player: Player = musicManager.manager.get(msg.guild.id);

        return !player ? this.error({ identifier: Identifiers.PreconditionGuildTextOnly, message: "Music isn't playing!"}) : this.ok();
    }

    public chatInputRun(interaction: CommandInteraction, command: ChatInputCommand, context: Precondition.Context): Precondition.Result {
        let musicManager = (this.container.client as Client).musicManager;
        let player: Player = musicManager.manager.get(interaction.guild.id);

        return !player ? this.error({ identifier: Identifiers.PreconditionGuildTextOnly, message: "Music isn't playing!"}) : this.ok();
    }
}