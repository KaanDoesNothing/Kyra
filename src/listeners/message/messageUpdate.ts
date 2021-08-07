import { Listener, Events } from "@sapphire/framework";
import { Message } from "discord.js";

export class UserEvent extends Listener<typeof Events.MessageUpdate> {
    public run(oldMsg: Message, newMsg: Message) {
        if(oldMsg.content === newMsg.content) return;
        
        this.container.client.emit("message", newMsg);
    }
}