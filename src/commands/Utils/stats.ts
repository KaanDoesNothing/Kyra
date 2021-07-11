import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import si from "systeminformation";
import { version } from "discord.js";
import { EmbedConstructor } from "../../lib/embed";

export class UserCommand extends Command {
	public async run(msg: Message, args: Args) {
        let ownerApplication = await this.context.client.application.fetch();

        let shardCount = this.context.client.shard?.count || 0;
        let djsVersion = version;
        let commands = this.context.client.stores.get("commands").size;
        let os = process.platform;
        let guilds = this.context.client.guilds.cache.size;
        let channels = this.context.client.channels.cache.size;
        let users = this.context.client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0);
        
        let embed = new EmbedConstructor()
        .addField("Owner", this.context.client.users.cache.get(ownerApplication.owner.id).tag, true)
        .addField("Library", `discord.js@${djsVersion}`, true)
        .addField("Commands", commands.toString(), true)
        .addField("Shards", shardCount.toString(), true)
        .addField("Guilds", guilds.toString(), true)
        .addField("Channels", channels.toString(), true)
        .addField("Users", users.toString(), true)
        .addField("OS", os, true);

        msg.channel.send({embeds: [embed]});
	}
}
