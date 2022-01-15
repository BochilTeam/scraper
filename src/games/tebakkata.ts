import fetch from "node-fetch";
import { TebakKata } from "./types";

export let tebakkatajson: TebakKata[];
export default async function tebakkata(): Promise<TebakKata> {
	if (!tebakkatajson) {
		let res = await fetch(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json"
		);
		tebakkatajson = await res.json();
	}
	return tebakkatajson[
		Math.floor(Math.random() * tebakkatajson.length)
	] as TebakKata;
}
