import { Message } from "discord.js";
import { KiraCommand, KiraCommandOptions } from "../../lib/structures/command";
import { ApplyOptions } from "@sapphire/decorators";

import { exec } from "child_process";
import { promisify } from "util";

let execute = promisify(exec);

@ApplyOptions<KiraCommandOptions>({
    hidden: true
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args) {
        let ownerApplication = await this.context.client.application.fetch();

        if(ownerApplication.owner.id !== msg.author.id) return;

        let gitPull = await exec("git pull");
        let npmInstall = await exec("npm install");
        let tsc = await exec("tsc");

        await msg.channel.send({content: "Updated, restarting!"});

        process.exit();
	}
}
