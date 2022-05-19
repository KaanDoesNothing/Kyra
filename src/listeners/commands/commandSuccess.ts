import {Events, Listener, MessageCommandSuccessPayload} from "@sapphire/framework";
import { commandsCache } from "../../lib/cache";

export class UserEvent extends Listener<typeof Events.MessageCommandSuccess> {
    public run({ context, message }: MessageCommandSuccessPayload) {
        console.log(`${message.author.tag} used a command: ${context.commandName}.`);
        commandsCache.commands_ran++;
    }
}