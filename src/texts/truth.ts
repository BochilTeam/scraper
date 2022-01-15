import fetch from "node-fetch";

export let truthjson: string[] = [];
export default async function truth(): Promise<string> {
	if (!truthjson.length)
		truthjson = (await (
			await fetch(
				"https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/truth.json"
			)
		).json()) as string[];
	return truthjson[Math.round(truthjson.length * Math.random())];
}
