import { ApplyOptions } from "@sapphire/decorators";
import type { Message } from "discord.js";
import { CommandOptions, Args } from "@sapphire/framework";
import { PermissionsPrecondition } from "@sapphire/framework";
import { provider } from "../../lib/db";
import { KiraCommand } from "../../lib/structures/command";

@ApplyOptions<CommandOptions>({
	aliases: ["setprefix"],
	description: "Sets the prefix.",
	preconditions: [new PermissionsPrecondition("MANAGE_GUILD")]
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
		let prefix = await args.rest("string") || "";

		if (prefix.length < 1) return msg.reply("You must provide a prefix.");

		let guildData = await provider.get("guilds", msg.guild.id);

		guildData.prefix = prefix;

		await provider.set("guilds", msg.guild.id, guildData);

		return msg.reply(`Prefix has been set to ${prefix}.`);
	}
}
