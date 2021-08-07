import { Message } from "discord.js";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<KiraCommandOptions>({
    hidden: true
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args) {
        let ownerApplication = await this.container.client.application.fetch();

        if(ownerApplication.owner.id !== msg.author.id) return;

        let values = this.container.client.stores.values();

        for (let value in values) {
            let store = this.container.client.stores.get(value);
            // await store?.load();
        }

        return msg.reply({content: "Reloaded."})
	}
}
