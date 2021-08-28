import { Identifiers, Precondition, PreconditionResult } from "@sapphire/framework";
import { Message } from "discord.js";
import type { Player } from "erela.js";
import type { Client } from "../lib/client";

export class CorePrecondition extends Precondition {
    public run(msg: Message): PreconditionResult {
        let musicManager = (this.container.client as Client).musicManager;
        let player: Player = musicManager.manager.get(msg.guild.id);

        return !player ? this.error({ identifier: Identifiers.PreconditionGuildTextOnly, message: "Music isn't playing!"}) : this.ok();
    }
}