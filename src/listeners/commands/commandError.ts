import { MessageCommandErrorPayload, Events, Listener } from "@sapphire/framework";

export class UserEvent extends Listener<typeof Events.MessageCommandError> {
    public run({ context, message, command, args }: MessageCommandErrorPayload) {
        console.log(args);
        // console.log(context.)
    }
}