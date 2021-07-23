import { Event, Events } from "@sapphire/framework";
import { Message } from "discord.js";
import { guildSettingsInterface } from "../../interfaces/guild";
import { messages } from "../../lib/cache";
import { provider } from "../../lib/db";

export class UserEvent extends Event<Events.Message> {
    public async run(msg: Message) {
        this.handleBlacklistedWords(msg);

        messages.handled++;
    }
    
    private async handleBlacklistedWords(msg: Message) {
        let guildSettings: guildSettingsInterface = await provider.get("guilds", msg.guild.id);
        let {enabled, list} = guildSettings.settings.blacklisted_words;

        if(enabled) {
            list.forEach(word => {
                if(msg.content.includes(word)) {
                    if(!msg.guild.me.permissions.has("MANAGE_MESSAGES") && msg.deletable) return;

                    if(msg.content.startsWith(guildSettings.prefix)) return;

                    msg.delete().catch(err => console.log(err));
                }
            });
        }
    }
}