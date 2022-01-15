import got from "got";
import { CakLontong } from "./types";

export let caklontongjson: CakLontong[];
export default async function caklontong(): Promise<CakLontong> {
	if (!caklontongjson) {
		caklontongjson = await got(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json"
		).json();
	}
	return caklontongjson[
		Math.floor(Math.random() * caklontongjson.length)
	] as CakLontong;
}
