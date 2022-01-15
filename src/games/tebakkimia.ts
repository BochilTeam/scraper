import fetch from "node-fetch";
import { TebakKimia } from "./types";

export let tebakkimiajson: TebakKimia[];
export default async function tebakkimia(): Promise<TebakKimia> {
	if (!tebakkimiajson) {
		let res = await fetch(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkimia.json"
		);
		tebakkimiajson = await res.json();
	}
	return tebakkimiajson[
		Math.floor(Math.random() * tebakkimiajson.length)
	] as TebakKimia;
}
