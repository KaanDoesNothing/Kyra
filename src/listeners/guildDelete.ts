import { Events, Listener } from "@sapphire/framework";
import {Client} from "../lib/client";

export class GuildEvent extends Listener<typeof Events.GuildDelete> {
    public async run() {
        (this.container.client as Client).updateStatus();
    }
}