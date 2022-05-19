import {AsyncPreconditionResult, ChatInputCommand, Identifiers, Precondition} from "@sapphire/framework";
import {CommandInteraction, Message} from "discord.js";
import type { userSettingsInterface } from "../interfaces/user";
import { provider } from "../lib/db";

export class CorePrecondition extends Precondition {
    public async messageRun(msg: Message): AsyncPreconditionResult {
        let settings: userSettingsInterface = await provider.get("users", msg.author.id);

        return settings.blacklisted ? this.error({ identifier: Identifiers.PreconditionGuildTextOnly, message: "You're blacklisted."}) : this.ok();
    }

    public async chatInputRun(interaction: CommandInteraction, command: ChatInputCommand, context: Precondition.Context) {
        let settings: userSettingsInterface = await provider.get("users", interaction.user.id);

        return settings.blacklisted ? this.error({ identifier: Identifiers.PreconditionGuildTextOnly, message: "You're blacklisted."}) : this.ok();
    }
}