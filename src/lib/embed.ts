import { Message, MessageEmbed, MessageEmbedOptions } from "discord.js";
import { DEFAULT_COLOR } from "../config";

export class EmbedConstructor extends MessageEmbed {
    constructor(msg?: Message, data?: MessageEmbed | MessageEmbedOptions) {
        super(data);

        if(msg) {
            this.color = msg.guild.me.roles.highest.color;
        }else {
            this.color = DEFAULT_COLOR;
        }
    }
}