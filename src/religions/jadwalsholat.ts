import cheerio from "cheerio";
import { readFileSync } from "fs";
import got from "got";
import { join } from "path";
import { ScraperError } from "../utils";
import { JadwalSholat, JadwalSholatItem } from "./types";
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const listJadwalSholat: JadwalSholatItem[] = JSON.parse(
	readFileSync(join(__dirname, "../../data/jadwal-sholat.json"), "utf-8")
);
export default async function jadwalsholat(
	kota: string
): Promise<JadwalSholat> {
	let jadwal: JadwalSholatItem;
	if (
		!(jadwal = listJadwalSholat.find(({ kota: Kota }) =>
			new RegExp(Kota, "ig").test(kota)
		))
	)
		throw new ScraperError(
			"List kota " + listJadwalSholat.map(({ kota }) => kota)
		);
	const today = await got(
		`https://www.jadwalsholat.org/adzan/ajax/ajax.daily1.php?id=${jadwal.value}`
	).text();
	let sholatToday: JadwalSholat["today"] = {};
	const $ = cheerio.load(today);
	$("table > tbody > tr")
		.filter(".table_light, .table_dark")
		.each(function () {
			const el = $(this).find("td");
			const sholat = el.eq(0).text();
			const time = el.eq(1).text();
			sholatToday[sholat] = time;
		});
	const data = await got(
		`https://jadwalsholat.org/jadwal-sholat/monthly.php?id=${jadwal.value}`
	).text();
	const list: JadwalSholat["list"] = [];
	const $$ = cheerio.load(data);
	$$("table.table_adzan > tbody > tr")
		.filter(".table_light, .table_dark")
		.each(function () {
			const el = $$(this).find("td");
			const date = el.eq(0).text().trim();
			const imsyak = el.eq(1).text().trim();
			const shubuh = el.eq(2).text().trim();
			const terbit = el.eq(3).text().trim();
			const dhuha = el.eq(4).text().trim();
			const dzuhur = el.eq(5).text().trim();
			const ashr = el.eq(6).text().trim();
			const magrib = el.eq(7).text().trim();
			const isyak = el.eq(8).text().trim();
			list.push({
				date,
				imsyak,
				shubuh,
				terbit,
				dhuha,
				dzuhur,
				ashr,
				magrib,
				isyak,
			});
		});
	return {
		date: $$("tr.table_title > td > h2.h2_edit").text().trim(),
		today: sholatToday,
		list,
	};
}
