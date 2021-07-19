import { Message } from "discord.js";
import { Args } from "@sapphire/framework";
import { EmbedConstructor } from "../../lib/embed";
import util from "util";
import { Command } from "../../lib/structures/command";

export class UserCommand extends Command {
	public async run(msg: Message, args) {
        const code = await args.rest("string");
        let ownerApplication = await this.context.client.application.fetch();

        if(ownerApplication.owner.id !== msg.author.id) return;

        let finalCode = "";

        let isAsync = msg.content.includes("async");

        if(isAsync) {
                finalCode = `(async () => {\n${code}\n})();`;
        }else {
                finalCode = code;
        }

        try {
                let evaled = await eval(finalCode);
                evaled = util.inspect(evaled);

                console.log(evaled);

                msg.channel.send({embeds: [new EmbedConstructor().setDescription(evaled)]});
        } catch(error) {
                msg.channel.send({embeds: [new EmbedConstructor().setDescription(error.message)]});
        }

        // msg.channel.send({embeds: [new EmbedConstructor().setDescription(evaled)]})
	}
}
