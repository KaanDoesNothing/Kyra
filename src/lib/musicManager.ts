import { Client } from "./client";
import { Manager } from "erela.js";

export class musicManager {
    public client: Client;
    public players: Array<String>;
    public manager: Manager;

    constructor(client: Client) {
        this.client = client;
        this.players = [];

        this.manager = new Manager({
            nodes: [
                { host: "localhost", port: 8341, password: "0751" }
            ],
            send(id, payload) {
                const guild = client.guilds.cache.get(id as any);

                if(guild) guild.shard.send(payload);
            }
        });

        this.launchEvents();
    }

    launchEvents() {
        this.manager.on("nodeConnect", (node) => console.log(`${node.options.identifier} has been connected.`));
        this.manager.on("nodeError", (node, error) => console.log(`${node.options.identifier} had an error: ${error.message}`));

        this.manager.on("trackStart", (player, track) => {
            const channel: any = this.client.channels.cache.get(player.textChannel as any);

            channel.send({content: `Now playing: ${track.title}`});
        });

        this.manager.on("trackEnd", (player) => {
            const channel: any = this.client.channels.cache.get(player.textChannel as any);

            channel.send({content: `Track has ended.`});
        });

        this.manager.on("queueEnd", (player) => {
            const channel: any = this.client.channels.cache.get(player.textChannel as any);

            channel.send({content: `Queue has ended.`});

            player.destroy();
        });

        this.manager.on("playerDestroy", (player) => {
            const channel: any = this.client.channels.cache.get(player.textChannel as any);

            channel.send({content: `Leaving the voice channel.`});
        });

        this.client.on("raw", (data) => this.manager.updateVoiceState(data as any));
    }
}