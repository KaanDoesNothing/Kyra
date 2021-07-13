import { SapphireClient } from "@sapphire/framework";
import { musicManager } from "./musicManager";

export class Client extends SapphireClient {
    public musicManager;
    constructor(options) {
        super(options);

        this.musicManager = new musicManager(this);

/*
        this.musicManager = new musicManager(this, {
            servers: [{ name: "Main", host: "localhost", port: 8341, auth: "0751" }],
            config: { moveOnDisconnect: false, resumable: false, resumableTimeout: 30, reconnectTries: 2, restTimeout: 10000 }
        });

        this.musicManager.launchEvents();*/
    }
}