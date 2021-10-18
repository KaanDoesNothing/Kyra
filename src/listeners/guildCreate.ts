import { Events, Listener, UserError } from "@sapphire/framework";
import {Client} from "../lib/client";

export class GuildEvent extends Listener<typeof Events.GuildCreate> {
    public async run() {
        (this.container.client as Client).updateStatus();
    }
}