import got from "got";
import { NomerHoki } from "./types";

export default async function nomorhoki(
	nomer: number | string
): Promise<NomerHoki | null> {
	const config = {
		nomer: encodeURIComponent(nomer),
		submit: "+Submit!+",
	};
	const data = await got
		.post("https://www.primbon.com/no_hoki_bagua_shuzi.php", {
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			},
			form: config,
		})
		.text();
	const results: string = data
		.split("</b><br></td></tr><tr><td")[0]
		.split(`<br><b>No. HP : ${nomer}</b><br>`)[1];
	const angka_bagua_shuzi: number = parseInt(
		results
			?.split("Angka Bagua Shuzi :")[1]
			?.split("</b><br><br>")[0]
			?.replace(/&#37/gi, "")
	);
	if (!angka_bagua_shuzi) return null;
	const kekayaan: number = parseInt(
		results.split("Kekayaan =")[1].split("<br>")[0]
	);
	const kesehatan: number = parseInt(
		results.split("Kesehatan =")[1].split("<br>")[0]
	);
	const cinta: number = parseInt(
		results.split("Cinta/Relasi =")[1].split("<br>")[0]
	);
	const kestabilan: number = parseInt(
		results.split("Kestabilan =")[1].split("<br>")[0]
	);
	const positif: number = parseInt(
		results
			.split("</b><br></td><td><!-- space -->")[0]
			.split("b>% = ")[1]
			?.replace(/&#37/gi, "")
	);
	const perselisihan: number = parseInt(
		results.split("Perselisihan =")[1].split("<br>")[0]
	);
	const kehilangan: number = parseInt(
		results.split("Kehilangan =")[1].split("<br>")[0]
	);
	const malapetaka: number = parseInt(
		results.split("Malapetaka =")[1].split("<br>")[0]
	);
	const Kehancuran: number = parseInt(
		results.split("Kehancuran =")[1].split("<br>")[0]
	);
	const negatif: number = parseInt(
		results.split("Kehancuran =")[1].split("<b>% =")[1]?.replace(/&#37/gi, "")
	);
	return {
		nomer: nomer,
		angka_bagua_shuzi,
		positif: {
			kekayaan,
			kesehatan,
			cinta,
			kestabilan,
			positif,
		},
		negatif: {
			perselisihan,
			kehilangan,
			malapetaka,
			Kehancuran,
			negatif,
		},
	};
}
