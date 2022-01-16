import cheerio from "cheerio";
import got from "got";
import { GoogleIt } from "./types";

export async function googleIt(query: string): Promise<GoogleIt> {
	const body = await got("https://www.google.com/search", {
		searchParams: {
			q: query,
		},
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
		},
	}).text();
	const $ = cheerio.load(body);
	const infoEl = $("div.I6TXqe > div.osrp-blk");
	let info: GoogleIt["info"] = {
		title: infoEl.find("h2.qrShPb > span").text().trim(),
		type: infoEl.find("div.SPZz6b > div.wwUB2c > span").text().trim(),
		description: "",
		image: [],
	};
	infoEl
		.find("div.LuVEUc > div.UDZeY > div.wDYxhc[data-attrid]:not(.NFQFxe)")
		.each(function () {
			const desc = $(this).text().trim();
			if (desc) info.description += desc + "\n";
		});
	infoEl
		.find(
			"div[jscontroller=M0hWhd] > div[jscontroller=ABJeBb] > div.eA0Zlc[jsname=dTDiAc]"
		)
		.each(function () {
			const img = $(this)
				.find("a > g-img.BA0A6c > img.rISBZc")
				.attr("src")
				?.trim(); // you can make buffer using function fromBase64ToString
			if (img) info.image.push(img);
		});
	info.image = [...new Set(info.image)];
	const articles: GoogleIt["articles"] = [];
	$("div.tF2Cxc").each(function () {
		const el = $(this);
		const header = el.find("cite.iUh30").text();
		const title = el.find("div.yuRUbf > a > h3").text();
		const url = el.find("div.yuRUbf > a[href]").attr("href");
		const description =
			el.find("div.VwiC3b > span").text() || el.find("div.VwiC3b").text();
		if (el.length) {
			articles.push({
				header: header,
				title: title,
				url,
				description: description,
			});
		}
	});
	return {
		info,
		articles,
	};
}
