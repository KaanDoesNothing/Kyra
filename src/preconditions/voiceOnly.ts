import { Identifiers, Precondition, PreconditionResult } from "@sapphire/framework";
import { Message } from "discord.js";

export class CorePrecondition extends Precondition {
    public run(msg: Message): PreconditionResult {
        const channel = msg.member.voice.channel;

        return channel == null ? this.error({ identifier: Identifiers.ArgumentTextChannel, message: "You need to be in a voice channel."}) : this.ok();
    }
}