import fetch from "node-fetch";

export let bucinjson: string[] = [];
export default async function bucin(): Promise<string> {
	if (!bucinjson.length)
		bucinjson = (await (
			await fetch(
				"https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/bucin.json"
			)
		).json()) as string[];
	return bucinjson[Math.floor(bucinjson.length * Math.random())];
}
