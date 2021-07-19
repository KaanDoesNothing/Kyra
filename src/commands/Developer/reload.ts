import { Message } from "discord.js";
import { Args } from "@sapphire/framework";
import { EmbedConstructor } from "../../lib/embed";
import util from "util";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<KiraCommandOptions>({
    hidden: true
})

export class UserCommand extends KiraCommand {
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
