import { Message } from "discord.js";
import { Args } from "@sapphire/framework";
import { EmbedConstructor } from "../../lib/embed";
import util from "util";
import { Command } from "../../lib/structures/command";

export class UserCommand extends Command {
	public async run(msg: Message, args) {
        let ownerApplication = await this.context.client.application.fetch();

        if(ownerApplication.owner.id !== msg.author.id) return;

        let values = this.context.client.stores.values();

        for (let value in values) {
            let store: any = this.context.client.stores.get(value);
            await store.load();
        }

        return msg.reply({content: "Reloaded."})
	}
}
