import type { Message } from "discord.js";
import type { Args } from "@sapphire/framework";
import { EmbedConstructor } from "../../lib/embed";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";
import type { userSettingsInterface } from "../../interfaces/user";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<KiraCommandOptions>({
    aliases: ["lb"]
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
        let rows = await this.settings.db.table("users").orderBy(this.settings.db.desc("balance")).limit(25).run();

        let embed = new EmbedConstructor(msg)
        .setTitle("Global Leaderboard");

        let output = "";
        
        for (let row in rows) {
            let data: userSettingsInterface = rows[row];

            let user = await this.context.client.users.fetch(data.id);

            output+= `${parseInt(row) + 1}. ${user.tag}: ${data.balance}\n`;
        }

        embed.setDescription(output);

        return msg.channel.send({embeds: [embed]});
	}
}
