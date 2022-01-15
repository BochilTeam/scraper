import fetch from "node-fetch";
import { TebakKabupaten } from "./types";

export let tebakkabupatenjson: TebakKabupaten[];
export default async function tebakkabupaten(): Promise<TebakKabupaten> {
	if (!tebakkabupatenjson) {
		let res = await fetch(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkabupaten.json"
		);
		tebakkabupatenjson = await res.json();
	}
	return tebakkabupatenjson[
		Math.floor(Math.random() * tebakkabupatenjson.length)
	] as TebakKabupaten;
}
