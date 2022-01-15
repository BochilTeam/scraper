import fetch from "node-fetch";
import { AlQuran } from "./types";

export async function alquran(): Promise<AlQuran[]> {
	const data: AlQuran[] = await (
		await fetch(
			"https://raw.githubusercontent.com/rzkytmgr/quran-api/master/data/quran.json"
		)
	).json();
	return data;
}
