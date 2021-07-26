import { Message, User } from "discord.js"
import { EmbedConstructor } from "../embed"

export let rolePlayEmbed = (msg: Message, user: User, type: string, url: string) => {
    let embed = new EmbedConstructor(msg)
    .setTitle(`${user.tag} has been ${type} by ${msg.author.tag}`)
    .setImage(url);

    return embed;
}