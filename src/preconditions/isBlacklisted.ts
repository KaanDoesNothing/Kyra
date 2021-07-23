import { AsyncPreconditionResult, Identifiers, Precondition } from "@sapphire/framework";
import { Message } from "discord.js";
import type { userSettingsInterface } from "../interfaces/user";
import { provider } from "../lib/db";

export class CorePrecondition extends Precondition {
    public async run(msg: Message): AsyncPreconditionResult {
        let settings: userSettingsInterface = await provider.get("users", msg.author.id);

        return settings.blacklisted ? this.error({ identifier: Identifiers.ArgumentTextChannel, message: "You're blacklisted."}) : this.ok();
    }
}