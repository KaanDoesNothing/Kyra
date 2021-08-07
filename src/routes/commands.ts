import { ApplyOptions } from "@sapphire/decorators";
import { ApiRequest, ApiResponse, methods, Route, RouteOptions } from "@sapphire/plugin-api";
import type { KiraCommand } from "../lib/structures/command";

@ApplyOptions<RouteOptions>({ route: "commands" })
export class UserRoute extends Route {
	public [methods.GET](_request: ApiRequest, response: ApiResponse) {
        //@ts-ignore
        let commands = this.context.client.stores.get("commands").map((cmd: KiraCommand) => {
            return {
                name: cmd.name,
                category: cmd.category,
                description: cmd.description,
                hidden: cmd.hidden
            }
        });

		response.json({ commands });
	}

	public [methods.POST](_request: ApiRequest, response: ApiResponse) {
		response.json({ message: "Landing Page!" });
	}
}