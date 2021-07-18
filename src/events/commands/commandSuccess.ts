import { Events, Event, CommandSuccessPayload } from "@sapphire/framework";
import { commandsCache } from "../../lib/cache";

export class UserEvent extends Event<Events.CommandSuccess> {
    public run({ context, message }: CommandSuccessPayload) {
        console.log(`${message.author.tag} used a command: ${context.commandName}.`);
        commandsCache.commands_ran++;
    }
}