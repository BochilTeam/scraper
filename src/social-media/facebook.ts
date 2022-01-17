import cheerio from "cheerio";
import got from "got";
import { randomBytes } from "../encryptions/crypto";
import { ScraperError } from "../utils";
import {
	FacebookDownloader,
	FacebookDownloaderV2,
	FacebookDownloaderV3
} from "./types";

interface Ires {
	size?: string;
	ext: string;
	url: string;
	quality?: string;
	vcodec?: string;
	fid: string;
}

// only support download video yet
export async function facebookdl(url: string): Promise<FacebookDownloader> {
	// https://fb.watch/9V3JrKcqHi/
	const {
		data: { id, thumbnail, duration, a, av, v },
	}: {
		data: {
			id: string;
			thumbnail: string;
			duration: number;
			a: Ires[];
			av: Ires[];
			v: Ires[];
		};
	} = await got(`https://youtube4kdownloader.com/ajax/getLinks.php`, {
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
		},
		searchParams: {
			video: url,
			rand: randomBytes(13),
		},
	}).json();
	const result: FacebookDownloader["result"] = a
		.concat(av)
		.concat(v)
		.map(({ size, ext, url, quality, vcodec, fid }) => {
			let isVideo = ext === "mp4";
			let isWebm = ext === "webm";
			return {
				size,
				ext,
				url,
				quality,
				vcodec,
				fid,
				isVideo: isVideo || isWebm,
				isAudio: /audio/i.test(quality) || (isVideo && !isWebm),
			};
			// ext webm video without audio
		});
	if (!result.length) throw new ScraperError(`Can't download!\n${JSON.stringify({ id, thumbnail, duration, a, av, v }, null, 2)}`)
	return {
		id,
		thumbnail,
		duration,
		result,
	};
}

export async function facebookdlv2(url: string): Promise<FacebookDownloaderV2> {
	const params: { url: string } = {
		url: url,
	};
	const res: { data: string; error: boolean } = await got
		.post("https://snapsave.app/action.php", {
			headers: {
				accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"accept-encoding": "gzip, deflate, br",
				"accept-language": "en-US,en;q=0.9",
				"content-type": "application/x-www-form-urlencoded",
				cookie:
					"PHPSESSID=8bp3pmf9b22vm9ihvuv6pn1h3d; current_language=id; _ga=GA1.2.5314845.1641630867; _gid=GA1.2.1966536698.1641630867; _gat=1; __gads=ID=66279abc1ad9d914-226d4524bccf00f8:T=1641630868:RT=1641630868:S=ALNI_MbL7LSCkGI6VwO33W7V6VkOozebNg; __atuvc=1%7C1; __atuvs=61d94c9354d617a5000; __atssc=google%3B1",
				origin: "https://snapsave.app",
				referer: "https://snapsave.app/id",
				"user-agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/96.0.4664.110 Safari/537.36",
			},
			form: params,
			searchParams: {
				lang: "id",
			},
		})
		.json();

	if (res.error) throw new ScraperError(JSON.stringify(res));
	let result: FacebookDownloaderV2["result"] = [];
	const $ = cheerio.load(res.data);
	$("table.table > tbody > tr").each(function () {
		const el = $(this).find("td");
		if (/tidak/i.test(el.eq(1).text())) {
			const quality = el.eq(0).text().split("(")?.[0]?.trim();
			const url = el.eq(2).find("a[href]").attr("href");
			result.push({ quality, url });
		}
	});
	if (!result.length) throw new ScraperError(`Can't download!\n${$.html()}`)
	return {
		id: $("div.media-content > div.content > p > strong")
			.text()
			.split("#")?.[1]
			?.trim(),
		thumbnail: $("figure > p.image > img[src]").attr("src"),
		result,
	};
}

export async function facebookdlv3(url: string): Promise<FacebookDownloaderV3> {
	const payload = {
		url
	}
	const text = await got("https://www.getfvid.com/downloader", {
		method: "POST",
		headers: {
			accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"accept-encoding": "gzip, deflate, br",
			"accept-language": "en-US,en;q=0.9",
			"content-type": "application/x-www-form-urlencoded",
			cookie: "_ga=GA1.2.887753826.1642391325; _gid=GA1.2.2022692773.1642391325; __gads=ID=4ea88e3817c8d71b-22332defffcf0045:T=1642391326:RT=1642391326:S=ALNI_MY3oJyiEG_b8KXZBJ7RqvN2Mn8wbw; XSRF-TOKEN=eyJpdiI6ImdNUElWWU83S01jOTdZeitCUWdkWXc9PSIsInZhbHVlIjoiTGxnaE9oRVJTKzA5NDBncUtBa0xEdCtqNHBJXC9ZMVFPR1U2RnBSYUFzZHltWElZS2VtVUltUTJ2TjB5V3pEeTYzRUNMcENjMURGSkhBXC9OUitpcjMrZz09IiwibWFjIjoiMTViZTNjZDI3ZTZmOTk2ZWRjOWM1NTA5MTU2NDFhYWFlMjIxNTQxZTJlYjliMjJiMzE3YzlkNGMxODc2NjhmMCJ9; laravel_session=eyJpdiI6IjhZbElIRmpLSkVqZGZpQXJoK2MzVHc9PSIsInZhbHVlIjoianBSSFhPb2t0RFY4Q1wvYkk1S3pxMUNxXC82b0U1NHZROTVpS1Z4dGhES3ZTYTNsenJUSXpwcWNMVDkwWFk4OUY1TitGNmlDK1RXbTVyREVzcHVoRnRidz09IiwibWFjIjoiY2U1YzI2ODZlYWI2NzFkZDU1NTQ5Zjk0M2NmMDc2MTZhY2M3ODQxYjljZGUzMDQwMTYxZGQwZGYxMDM3NDMyZSJ9; __cf_bm=ephRNXRqwgrTB4SmHlsudy886EfsR2Ns2KtXVBnph4I-1642392732-0-AXtTUW5HRNQUeUcTJPhJTOPlMcjBFmMyoLKYOnxrDZ6Fa06XaJ4pMNW9arLg4zco/ef+ji00IV8NZb0nGOAKgfg=; _gat=1; __atuvc=6%7C3; __atuvs=61e4e71d2b803588005; __atssc=google%3B3",
			origin: "https://www.getfvid.com",
			referer: "https://www.getfvid.com/",
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
		},
		form: payload
	}).text()
	const $ = cheerio.load(text)
	const row = $("div.card > div.row > div")
	const thumbnail: string = /background-image: url\((.*?)\);/i.exec(
		row.eq(0).find('a[href]').attr('style')
	)[1]
	const result: FacebookDownloaderV3['result'] = []
	row.find('.btns-download > p > a[href]').each(function () {
		const el = $(this)
		const info = el.text().trim()
		const isAudio = /audio/i.test(info)
		const quality = isAudio ? 'audio' : /Download in (\w+) Quality/i.exec(info)[1]
		const isVideo = quality !== 'audio'
		result.push({
			url: el.attr('href'),
			quality,
			isAudio,
			isVideo,
		})
	})
	if (!result.length) throw new ScraperError(`Can't download!\n${$.html()}`)
	return {
		title: $("#title_video").val() as string,
		thumbnail,
		result
	}
}
