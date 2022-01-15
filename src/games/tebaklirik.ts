import fetch from "node-fetch";
import { TebakLirik } from "./types";

export let tebaklirikjson: TebakLirik[];
export default async function tebaklirik(): Promise<TebakLirik> {
	if (!tebaklirikjson) {
		let res = await fetch(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json"
		);
		tebaklirikjson = await res.json();
	}
	return tebaklirikjson[
		Math.floor(Math.random() * tebaklirikjson.length)
	] as TebakLirik;
}
