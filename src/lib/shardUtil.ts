import {Client} from "./client";

export class ShardUtil {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async getShardCount() {
        let evaled = await this.client.shard.broadcastEval(() => true);

        return evaled.length;
    }

    async getGuildCount() {
        let evaled = await this.client.shard.broadcastEval((client) => client.guilds.cache.size);

        return evaled.reduce((prev, next) => prev + next, 0);
    }

    async getChannelCount() {
        let evaled = await this.client.shard.broadcastEval((client) => client.channels.cache.size);

        return evaled.reduce((prev, next) => prev + next, 0);
    }

    async getUserCount() {
        let evaled = await this.client.shard.broadcastEval((client) => client.guilds.cache.reduce((prev, next) => prev + next.memberCount, 0));

        return evaled.reduce((prev, next) => prev + next, 0);
    }
}