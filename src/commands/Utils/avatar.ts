import type { GuildMember, Message } from "discord.js";
import { Args, CommandOptions, PermissionsPrecondition } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { EmbedConstructor } from "../../lib/embed";
import { KiraCommand } from "../../lib/structures/command";

@ApplyOptions<CommandOptions>({
    aliases: ["av"]
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
        let user = await args.pick("user").catch(() => msg.author);

        let embed = new EmbedConstructor()
        .setImage(user.displayAvatarURL({dynamic: true, size: 4096}));

        msg.channel.send({embeds: [embed]});
	}
}
