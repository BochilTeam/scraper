import got from "got";
import { TebakLirik } from "./types";

export let tebaklirikjson: TebakLirik[];
export default async function tebaklirik(): Promise<TebakLirik> {
	if (!tebaklirikjson) {
		tebaklirikjson = await got(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json"
		).json();
	}
	return tebaklirikjson[
		Math.floor(Math.random() * tebaklirikjson.length)
	] as TebakLirik;
}
