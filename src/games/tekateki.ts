import fetch from "node-fetch";
import { TekaTeki } from "./types";

export let tekatekijson: TekaTeki[];
export default async function tekateki(): Promise<TekaTeki> {
	if (!tekatekijson) {
		let res = await fetch(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json"
		);
		tekatekijson = await res.json();
	}
	return tekatekijson[
		Math.floor(Math.random() * tekatekijson.length)
	] as TekaTeki;
}
