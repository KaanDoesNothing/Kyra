import { ApplyOptions } from "@sapphire/decorators";
import type { Message, User } from "discord.js";
import { CommandOptions, Args } from "@sapphire/framework";
import { Client } from "../../lib/client";
import { KiraCommand } from "../../lib/structures/command";
import { Player } from "erela.js";
import { EmbedConstructor } from "../../lib/embed";
import {Duration, TimeTypes} from "@sapphire/time-utilities";
import { millisToMinutesAndSeconds } from "../../lib/utils";

@ApplyOptions<CommandOptions>({
	preconditions: ["voiceOnly", "playerRequired"],
    aliases: ["np"]
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
		let musicManager = (this.container.client as Client).musicManager;
		let player: Player = musicManager.manager.get(msg.guild.id);
        
        let track = player.queue.current;

        let embed = new EmbedConstructor(msg)
        .setThumbnail(track.thumbnail)
        .setTitle(`Now playing: ${track.title}`)
        .setDescription(`
        ${millisToMinutesAndSeconds(player.position)} / ${millisToMinutesAndSeconds(track.duration)}
        \nRequested by: ${(track.requester as User).tag}
        `);

        msg.channel.send({embeds: [embed]});
	}
}
