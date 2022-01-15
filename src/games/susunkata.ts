import fetch from "node-fetch";
import { SusunKata } from "./types";

export let susunkatajson: SusunKata[];
export default async function susunkata(): Promise<SusunKata> {
	if (!susunkatajson) {
		let res = await fetch(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json"
		);
		susunkatajson = await res.json();
	}
	return susunkatajson[
		Math.floor(Math.random() * susunkatajson.length)
	] as SusunKata;
}
