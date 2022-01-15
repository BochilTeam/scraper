import fetch from "node-fetch";
import { TebakGambar } from "./types";

export let tebakgambarjson: TebakGambar[];
export default async function tebakgambar(): Promise<TebakGambar> {
	if (!tebakgambarjson) {
		let res = await fetch(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json"
		);
		tebakgambarjson = await res.json();
	}
	return tebakgambarjson[
		Math.floor(Math.random() * tebakgambarjson.length)
	] as TebakGambar;
}
