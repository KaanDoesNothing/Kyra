import { MessageEmbed } from "discord.js";
import { DEFAULT_COLOR } from "../config";

export class EmbedConstructor extends MessageEmbed {
    constructor() {
        super();
        this.color = DEFAULT_COLOR;
    }
}