import type { Message } from "discord.js";
import { Args } from "@sapphire/framework";
import { version } from "discord.js";
import { EmbedConstructor } from "../../lib/embed";
import { commandsCache, messages } from "../../lib/cache";
import { KiraCommand } from "../../lib/structures/command";
import {totalmem, freemem, uptime} from "os";
import { millisToMinutesAndSeconds } from "../../lib/utils";
import {Client} from "../../lib/client";

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
            let ownerApplication = await this.container.client.application.fetch();

            let shardCount = await (this.container.client as Client).shardManager.getShardCount();
            let djsVersion = version;
            let commands = this.container.client.stores.get("commands").size;
            let os = process.platform;
            let guilds = await (this.container.client as Client).shardManager.getGuildCount();
            let channels = await (this.container.client as Client).shardManager.getChannelCount();
            let users = await (this.container.client as Client).shardManager.getUserCount();

            let totalMem = totalmem() / 1024 / 1024 / 1024;
            let freeMem = freemem() / 1024 / 1024 / 1024;
            
            let embed = new EmbedConstructor(msg)
            .addField("Owner", this.container.client.users.cache.get(ownerApplication.owner.id).tag, true)
            .addField("Library", `discord.js@${djsVersion}`, true)
            .addField("Commands", commands.toString(), true)
            .addField("Commands Ran", commandsCache.commands_ran.toString(), true)
            .addField("Messages Read", messages.handled.toString(), true)
            .addField("Shards", shardCount.toString(), true)
            .addField("Uptime", millisToMinutesAndSeconds(this.container.client.uptime), true)
            .addField("Guilds", guilds.toString(), true)
            .addField("Channels", channels.toString(), true)
            .addField("Users", users.toString(), true)
            .addField("OS", os, true)
            // .addField("OS Uptime", millisToMinutesAndSeconds(uptime));
            // .addField("Total Ram", `${(totalMem - freeMem).toFixed(2)} GB / ${totalMem} GB`, true)

            return msg.channel.send({embeds: [embed]});
	}
}
