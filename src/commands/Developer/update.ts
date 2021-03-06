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
	public async messageRun(msg: Message, args) {
        let ownerApplication = await this.container.client.application.fetch();

        if(ownerApplication.owner.id !== msg.author.id) return;

        await msg.channel.send({content: "Running git pull."});
        let gitPull = await exec("git pull");

        await msg.channel.send({content: "Running npm install."});
        let npmInstall = await exec("npm install");
        
        await msg.channel.send({content: "Running tsc."});
        let tsc = await exec("tsc");

        await msg.channel.send({content: "Updated, restarting!"});

        process.exit();
	}
}
