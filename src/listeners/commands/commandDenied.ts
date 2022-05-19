import { Events, Listener, UserError, MessageCommandDeniedPayload } from "@sapphire/framework";

export class CommandEvent extends Listener<typeof Events.MessageCommandDenied> {
    public async run({ context, message: content }: UserError, { message }: MessageCommandDeniedPayload) {
        if (Reflect.get(Object(context), "silent")) return;

        return message.channel.send({ content });
    }
}