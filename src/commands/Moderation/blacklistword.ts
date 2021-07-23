import type { Message } from "discord.js";
import { Args, PermissionsPrecondition, Precondition} from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";
import { EmbedConstructor } from "../../lib/embed";
import type { guildSettingsInterface } from "../../interfaces/guild";

@ApplyOptions<KiraCommandOptions>({
    subCommands: ["list", "add", "remove"]
})

export class UserCommand extends KiraCommand {
    public async add(msg: Message, args: Args) {
        if(!msg.member.permissions.has("MANAGE_MESSAGES")) return msg.reply({content: `You don't have the permissions to do this`});
        let word = await args.pick("string");

        if(!word) {
            return msg.channel.send({content: "You need to provide a word."})
        }

        let guildSettings: guildSettingsInterface = await this.settings.get("guilds", msg.guild.id);

        guildSettings.settings.blacklisted_words.list.push(word);

        await this.settings.set("guilds", msg.guild.id, guildSettings);

        msg.channel.send({content: `${word} has been added to the list.`});
    }

    public async remove(msg: Message, args: Args) {
        if(!msg.member.permissions.has("MANAGE_MESSAGES")) return msg.reply({content: `You don't have the permissions to do this`});
        let word = await args.pick("string");

        if(!word) {
            return msg.channel.send({content: "You need to provide a word."})
        }

        let guildSettings: guildSettingsInterface = await this.settings.get("guilds", msg.guild.id);

        let list = guildSettings.settings.blacklisted_words.list;
        guildSettings.settings.blacklisted_words.list = list.filter(row => row !== word);

        await this.settings.set("guilds", msg.guild.id, guildSettings);

        msg.channel.send({content: `${word} has been removed from the list.`});
    }

    public async list(msg: Message, args: Args) {
        if(!msg.member.permissions.has("MANAGE_MESSAGES")) return msg.reply({content: `You don't have the permissions to do this`});
        let guildSettings: guildSettingsInterface = await this.settings.get("guilds", msg.guild.id);
        
        let embed = new EmbedConstructor()
        .setTitle("Blacklisted Words")
        .setDescription(guildSettings.settings.blacklisted_words.list.map(word => `${word}`).join("\n"));

        msg.channel.send({embeds: [embed]});
    }
}
