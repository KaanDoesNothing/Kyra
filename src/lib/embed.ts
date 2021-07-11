import { MessageEmbed } from "discord.js";
import { DEFAULT_COLOR } from "../config";

export let EmbedConstructor = class extends MessageEmbed {
    constructor() {
        super();
        this.color = DEFAULT_COLOR;
    }
}