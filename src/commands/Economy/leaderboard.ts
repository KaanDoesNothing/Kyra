import type { Message } from "discord.js";
import type { Args } from "@sapphire/framework";
import { EmbedConstructor } from "../../lib/embed";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";
import type { userSettingsInterface } from "../../interfaces/user";
import { ApplyOptions } from "@sapphire/decorators";
import {User} from "../../entities/user";

@ApplyOptions<KiraCommandOptions>({
    aliases: ["lb"]
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
        let rows = await User.createQueryBuilder("user").select("id, JSON_EXTRACT(user.data, '$.balance') as balance").orderBy(`JSON_EXTRACT(user.data, '$.balance')`, "DESC").limit(10).execute();

        console.log(rows);

        let embed = new EmbedConstructor(msg)
        .setTitle("Global Leaderboard");

        let output = "";

        for (let row in rows) {
            let data: userSettingsInterface = rows[row];

            let user: any = await this.container.client.users.fetch(data.id).catch(err => console.log(err)).then(res => res);

            if(!user) continue;

            output+= `${parseInt(row) + 1}. ${user.tag}: ${data.balance}\n`;
        }

        embed.setDescription(output);

        return msg.channel.send({embeds: [embed]});
	}
}
