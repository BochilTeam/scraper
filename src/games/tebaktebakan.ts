import fetch from "node-fetch";
import { TebakTebakan } from "./types";

export let tebaktebakanjson: TebakTebakan[];
export default async function tebaktebakan(): Promise<TebakTebakan> {
	if (!tebaktebakanjson) {
		let res = await fetch(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json"
		);
		tebaktebakanjson = await res.json();
	}
	return tebaktebakanjson[
		Math.floor(Math.random() * tebaktebakanjson.length)
	] as TebakTebakan;
}
