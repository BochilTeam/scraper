import got from "got";
import { AsahOtak } from "./types";

export let asahotakjson: AsahOtak[];
export default async function asahotak(): Promise<AsahOtak> {
	if (!asahotakjson) {
		asahotakjson = await got(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json"
		).json();
	}
	return asahotakjson[
		Math.floor(Math.random() * asahotakjson.length)
	] as AsahOtak;
}
