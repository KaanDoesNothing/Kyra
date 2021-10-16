import type { Message } from "discord.js";
import type { Args } from "@sapphire/framework";
import { KiraCommand } from "../../lib/structures/command";
import { userSettingsInterface } from "../../interfaces/user";
import { ECONOMY_DAILY_COOLDOWN, ECONOMY_DAILY_REWARD } from "../../config";

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args: Args) {
                let userSettings: userSettingsInterface = await this.settings.get("users", msg.author.id);

                if((Date.now() - userSettings.timeout_daily) > ECONOMY_DAILY_COOLDOWN) {
                        userSettings.timeout_daily = Date.now();
                        userSettings.balance += ECONOMY_DAILY_REWARD;

                        this.settings.set("users", msg.author.id, userSettings);

                        msg.reply("You've collected your daily!");
                }else {
                        msg.reply({content: "You've already collected your daily!"});
                }
	}
}
