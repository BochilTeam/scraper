import fetch from "node-fetch";
import { SiapakahAku } from "./types";

export let siapakahakujson: SiapakahAku[];
export default async function siapakahaku(): Promise<SiapakahAku> {
	if (!siapakahakujson) {
		let res = await fetch(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json"
		);
		siapakahakujson = await res.json();
	}
	return siapakahakujson[
		Math.floor(Math.random() * siapakahakujson.length)
	] as SiapakahAku;
}
