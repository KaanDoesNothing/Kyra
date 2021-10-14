import OAuthClient from "disco-oauth";
import config from "../private.json";

export const authClient = new OAuthClient(config.application.id, config.application.secret);

authClient.setScopes("identify", "guilds");
authClient.setRedirect(config.dashboard.frontend);