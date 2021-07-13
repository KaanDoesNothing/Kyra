import type { GuildMember, Message } from "discord.js";
import { Command, Args, CommandOptions, PermissionsPrecondition } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { EmbedConstructor } from "../../lib/embed";

@ApplyOptions<CommandOptions>({
    aliases: ["av"]
})

export class UserCommand extends Command {
	public async run(msg: Message, args: Args) {
        let user = await args.pick("user").catch(() => msg.author);

        let embed = new EmbedConstructor()
        .setImage(user.displayAvatarURL({dynamic: true, size: 4096}));

        msg.channel.send({embeds: [embed]});
	}
}
