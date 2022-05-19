import {ChatInputCommand, Identifiers, Precondition, PreconditionResult} from "@sapphire/framework";
import { Message, CommandInteraction } from "discord.js";

export class CorePrecondition extends Precondition {
    public messageRun(msg: Message): PreconditionResult {
        const channel = msg.member.voice.channel;

        return channel == null ? this.error({ identifier: Identifiers.PreconditionGuildTextOnly, message: "You need to be in a voice channel."}) : this.ok();
    }

    public chatInputRun(interaction: CommandInteraction, command: ChatInputCommand, context: Precondition.Context): Precondition.Result {
        const channel = interaction.guild.members.cache.get(interaction.user.id).voice.channel;

        return channel == null ? this.error({ identifier: Identifiers.PreconditionGuildTextOnly, message: "You need to be in a voice channel."}) : this.ok();
    }
}