import { Event, Events } from "@sapphire/framework";
import { Message } from "discord.js";

export class UserEvent extends Event<Events.MessageUpdate> {
    public run(oldMsg: Message, newMsg: Message) {
        if(oldMsg.content === newMsg.content) return;
        
        this.context.client.emit("message", newMsg);
    }
}