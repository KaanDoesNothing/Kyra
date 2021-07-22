import type { Message } from "discord.js";
import { Args } from "@sapphire/framework";
import { version } from "discord.js";
import { EmbedConstructor } from "../../lib/embed";
import { commandsCache } from "../../lib/cache";
import { KiraCommand } from "../../lib/structures/command";
import {totalmem, freemem, uptime} from "os";
import { millisToMinutesAndSeconds } from "../../lib/utils";

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
            let ownerApplication = await this.context.client.application.fetch();

            console.log(this.context.client.shard);

            let shardCount = this.context.client.shard?.count || 0;
            let djsVersion = version;
            let commands = this.context.client.stores.get("commands").size;
            let os = process.platform;
            let guilds = this.context.client.guilds.cache.size;
            let channels = this.context.client.channels.cache.size;
            let users = this.context.client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0);

            let totalMem = totalmem() / 1024 / 1024 / 1024;
            let freeMem = freemem() / 1024 / 1024 / 1024;
            
            let embed = new EmbedConstructor(msg)
            .addField("Owner", this.context.client.users.cache.get(ownerApplication.owner.id).tag, true)
            .addField("Library", `discord.js@${djsVersion}`, true)
            .addField("Commands", commands.toString(), true)
            .addField("Commands Ran", commandsCache.commands_ran.toString(), true)
            .addField("Shards", shardCount.toString(), true)
            .addField("Uptime", millisToMinutesAndSeconds(this.context.client.uptime), true)
            .addField("Guilds", guilds.toString(), true)
            .addField("Channels", channels.toString(), true)
            .addField("Users", users.toString(), true)
            .addField("OS", os, true)
            // .addField("OS Uptime", millisToMinutesAndSeconds(uptime));
            // .addField("Total Ram", `${(totalMem - freeMem).toFixed(2)} GB / ${totalMem} GB`, true)

            return msg.channel.send({embeds: [embed]});
	}
}
