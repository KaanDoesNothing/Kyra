import { r } from "rethinkdb-ts";

export const db = r;

r.connectPool({ db: "kira" });