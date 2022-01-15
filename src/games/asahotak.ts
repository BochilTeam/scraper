import fetch from "node-fetch";
import { AsahOtak } from "./types";

export let asahotakjson: AsahOtak[];
export default async function asahotak(): Promise<AsahOtak> {
	if (!asahotakjson) {
		let res = await fetch(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json"
		);
		asahotakjson = await res.json();
	}
	return asahotakjson[
		Math.floor(Math.random() * asahotakjson.length)
	] as AsahOtak;
}
