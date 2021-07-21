import type { GuildMember, Message } from "discord.js";
import { Args, CommandOptions, PermissionsPrecondition } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { EmbedConstructor } from "../../lib/embed";
import { KiraCommand } from "../../lib/structures/command";
import axios from "axios";

@ApplyOptions<CommandOptions>({
    aliases: ["pd"]
})

export class UserCommand extends KiraCommand {
	public async run(msg: Message, args: Args) {
        let input = await args.pick("string").catch(() => msg.reply({content: "Provide a pokemon name."}));
        if(!input) return;

        let pokemon: any = (await (await axios.get(`https://some-random-api.ml/pokedex?pokemon=${input}`)).data)

        if(pokemon.error) return msg.reply(pokemon.error); 

        let pokestats = [];

        for (let stat in pokemon.stats) {
            pokestats.push(pokemon.stats[stat]);
        }

        let embed = new EmbedConstructor(msg)
        .setTitle(pokemon.name)
        .setDescription(pokemon.description)
        .setThumbnail(pokemon.sprites.animated)
        .addField("ID", pokemon.id, true)
        .addField("Type", pokemon.type.join(", "))
        .addField("Species", pokemon.species.join(", "), true)
        .addField("Abilities", pokemon.abilities.join(", "), true)
        .addField("Height", pokemon.height, true)
        .addField("Weight", pokemon.weight, true)
        .addField("Base Experience", pokemon.base_experience, true)
        .addField("Gender", pokemon.gender.join(", "), true)
        .addField("Egg Groups", pokemon.egg_groups.join(", "), true)
        .addField("Stats", pokestats.join(", "), true)
        .addField("Evolutions", pokemon.family.evolutionLine.join(", "), true)
        .addField("Generation", pokemon.generation, true);

        msg.channel.send({embeds: [embed]});
	}
}
