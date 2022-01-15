import fetch from "node-fetch";
import { CakLontong } from "./types";

export let caklontongjson: CakLontong[];
export default async function caklontong(): Promise<CakLontong> {
	if (!caklontongjson) {
		let res = await fetch(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json"
		);
		caklontongjson = await res.json();
	}
	return caklontongjson[
		Math.floor(Math.random() * caklontongjson.length)
	] as CakLontong;
}
