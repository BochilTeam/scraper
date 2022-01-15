import fetch from "node-fetch";
import { TebakBendera } from "./types";

export let tebakbenderajson: TebakBendera[];
export default async function tebakbendera(): Promise<TebakBendera> {
	if (!tebakbenderajson) {
		let res = await fetch(
			"https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera.json"
		);
		tebakbenderajson = await res.json();
	}
	return tebakbenderajson[
		Math.floor(Math.random() * tebakbenderajson.length)
	] as TebakBendera;
}
