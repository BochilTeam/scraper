import cheerio from "cheerio";
import FormData from "form-data";
import got from "got";
import { InstagramDownloader, InstagramDownloaderv2 } from "./types";

export async function instagramdl(url: string): Promise<InstagramDownloader[]> {
	if (!/https?:\/\/www\.instagram\.com\/(reel|tv|p)\//i.test(url))
		throw "Invalid url!!";
	let form = new FormData();
	form.append("url", url);
	form.append("action", "post");
	const data = await got
		.post("https://snapinsta.app/action.php", {
			body: form,
			headers: {
				cookie:
					"_ga=GA1.2.1450546575.1637033620; __gads=ID=68a947f8174e0410-22fc6960b3ce005e:T=1637033620:RT=1637033620:S=ALNI_MbXTvxtxuISyAFMevds6-00PecLlw; _gid=GA1.2.1740129251.1639389841; PHPSESSID=s6v9d60qk41t8mmp15s3cdm1o0; _gat=1; __atuvc=8%7C46%2C0%7C47%2C0%7C48%2C0%7C49%2C4%7C50; __atuvs=61b82670279d8b87001; __atssc=google%3B6",
				"user-agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
				...form.getHeaders(),
			},
		})
		.text();
	const $ = cheerio.load(data);
	let results: InstagramDownloader[] = [];
	$(".row.download-box > div").each(function () {
		const thumbnail = Buffer.from(
			$(this)
				.find(".download-items__thumb > img[src]")
				.attr("src")
				?.split(";base64,")[1],
			"base64"
		);
		let url = $(this).find(".download-items__btn > a[href]").attr("href");
		if (!/https?:\/\//i.test(url))
			url = encodeURI("https://snapinsta.app" + url);
		results.push({ thumbnail, url });
	});
	return results;
}

export async function instagramdlv2(
	url: string
): Promise<InstagramDownloaderv2[]> {
	if (!/https?:\/\/www\.instagram\.com\/(reel|tv|p)\//i.test(url))
		throw "Invalid url!!";
	const payload = {
		url: encodeURI(url),
		submit: "",
	};
	const data = await got
		.post("https://downloadgram.org/", {
			form: payload,
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				cookie:
					"_ga=GA1.2.654346005.1642149344; _gid=GA1.2.1562255413.1642149344; _gat_gtag_UA_142480840_1=1; __atuvc=1%7C2; __atuvs=61e135df10258fab000; __gads=ID=b4c9d2019034e5ed-227b64f3e5cf003a:T=1642149344:RT=1642149344:S=ALNI_MbtRULwcpAb_-lCLCSUPN5m5rd54A",
				origin: "https://downloadgram.org",
				referer: "https://downloadgram.org/",
				"user-agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
			},
		})
		.text();
	const $ = cheerio.load(data);
	let results: InstagramDownloaderv2[] = [];
	if ($("#downloadBox > a").length) {
		let temp: {
			thumbnail?: string;
			sourceUrl?: string;
			index: number;
			url?: string;
		}[] = [];
		$("#downloadBox > video").each(function (i) {
			const thumbnail = $(this).attr("poster");
			const sourceUrl = $(this).find("source[src]").attr("src");
			if (thumbnail)
				temp.push({
					thumbnail,
					sourceUrl,
					index: i,
				});
		});

		$("#downloadBox > img").each(function (i) {
			const j = temp.findIndex(({ index }) => index === i);
			const thumbnail = $(this).attr("src");
			if (thumbnail)
				if (j !== -1) temp[j].thumbnail = thumbnail;
				else temp.push({ thumbnail, index: i });
		});
		$("#downloadBox > a").each(function (i) {
			const j = temp.findIndex(({ index }) => index === i);
			const url = $(this).attr("href");
			if (j !== -1) temp[j].url = url;
			else temp.push({ url, index: i });
		});
		results = temp.map(({ thumbnail, sourceUrl, url }) => ({
			thumbnail,
			sourceUrl,
			url,
		}));
	}
	return results;

}
interface Iigstory {
	thumbnail: string;
	isVideo: boolean;
	url: string;
}

export async function instagramStory(name: string): Promise<Iigstory[]> {
	const data = await got(
		`https://www.insta-stories.net/data.php?username=${name}&t=${+new Date()}`
	).text();
	const $ = cheerio.load(data);
	let results: Iigstory[] = [];
	$("center").each(function () {
		let thumbnail: string,
			isVideo: boolean = false,
			link = $(this).find("img");
		if (link.length) thumbnail = link.attr("src");
		else {
			isVideo = true;
			thumbnail = $(this).find("video > source").attr("src");
		}
		const url: string = $(this).find("a.download-btn").attr("href");
		if (url) results.push({ thumbnail, isVideo, url });
	});
	return results;
}
