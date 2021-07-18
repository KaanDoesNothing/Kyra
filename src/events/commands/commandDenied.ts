import { Events, Event, UserError, CommandDeniedPayload } from "@sapphire/framework";

export class CommandEvent extends Event<Events.CommandDenied> {
    public async run({ context, message: content }: UserError, { message }: CommandDeniedPayload) {
        if (Reflect.get(Object(context), "silent")) return;

        return message.channel.send({ content });
    }
}