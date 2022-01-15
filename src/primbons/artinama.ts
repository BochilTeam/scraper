import got from "got";
export default async function artinama(nama: string): Promise<string> {
	const data = await got(
		`https://www.primbon.com/arti_nama.php?nama1=${nama}&proses=+Submit%21+`
	).text();
	const results: string | void = data
		.split("<h1>ARTI NAMA</h1><br>")[1]
		?.split("<TABLE>")[0]
		?.replace(/<(\/)?(h1|br|i|b)>/gim, "")
		?.trim();
	return results || "";
}
