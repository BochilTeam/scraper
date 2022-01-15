import fetch from "node-fetch";
import { AsmaulHusna } from "./types";

export let asmaulhusnajson: AsmaulHusna[];

export default async function asmaulhusna(): Promise<AsmaulHusna> {
	if (!asmaulhusnajson)
		asmaulhusnajson = await (
			await fetch(
				"https://raw.githubusercontent.com/BochilTeam/database/master/religi/asmaulhusna.json"
			)
		).json();
	return asmaulhusnajson[
		Math.floor(Math.random() * asmaulhusnajson.length)
	] as AsmaulHusna;
}
