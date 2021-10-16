import { Message } from "discord.js";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";
import { ApplyOptions } from "@sapphire/decorators";
import { provider } from "../../lib/db";

@ApplyOptions<KiraCommandOptions>({
    hidden: true
})

export class UserCommand extends KiraCommand {
	public async messageRun(msg: Message, args) {
        let ownerApplication = await this.container.client.application.fetch();

        if(ownerApplication.owner.id !== msg.author.id) return;

        let user = await args.pick("user").catch(() => msg.author);
        let newBal = await args.pick("number");

        let userSettings = await provider.get("users", user.id);

        userSettings.balance = parseInt(newBal);

        provider.set("users", user.id, userSettings);

        msg.channel.send({content: `Balance has been changed to ${newBal}`});
	}
}
