import cheerio from "cheerio";
import got, { Headers, Response } from "got";
import {
	InstagramDownloader,
	InstagramDownloaderV2,
	InstagramDownloaderV4,
	InstagramStory,
	InstagramStoryv2
} from "./types";
import { ScraperError } from "../utils";

export async function instagramdl(url: string): Promise<InstagramDownloader[]> {
	if (!/https?:\/\/www\.instagram\.com\/(reel|tv|p)\//i.test(url))
		throw "Invalid url!!";

	const data = await got
		.post("https://snapinsta.app/action.php", {
			form: {
				url,
				action: "post",
			},
			headers: {
				cookie:
					"_ga=GA1.2.1450546575.1637033620; __gads=ID=68a947f8174e0410-22fc6960b3ce005e:T=1637033620:RT=1637033620:S=ALNI_MbXTvxtxuISyAFMevds6-00PecLlw; _gid=GA1.2.1740129251.1639389841; PHPSESSID=s6v9d60qk41t8mmp15s3cdm1o0; _gat=1; __atuvc=8%7C46%2C0%7C47%2C0%7C48%2C0%7C49%2C4%7C50; __atuvs=61b82670279d8b87001; __atssc=google%3B6",
				"user-agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
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
	if (!results.length) throw new ScraperError(`Can't download!\n${$.html()}`)
	return results;
}

export async function instagramdlv2(
	url: string
): Promise<InstagramDownloaderV2[]> {
	if (!/https?:\/\/www\.instagram\.com\/(reel|tv|p)\//i.test(url))
		throw "Invalid url!!";
	const payload = {
		url: url,
		submit: " ",
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
	let results: InstagramDownloaderV2[] = [];
	if (Boolean($("#downloadBox > a").length)) {
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
	if (!results.length) throw new ScraperError(`Can't download!\n${$.html()}`)
	return results;
}

export async function instagramdlv3(url: string): Promise<InstagramDownloaderV2[]> {
	const payload = {
		link: url,
		submit: ""
	}, headers: Headers = {
		"content-type": "application/x-www-form-urlencoded",
		// cookie: "",
		origin: "https://instasave.website",
		referer: "https://instasave.website/",
		"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
	}

	let body: Response<string> = await got("https://instasave.website/", {
		form: payload,
		method: "POST",
		headers: headers
	}).catch(async (_) => await got('https://server.instasave.website/', {
		form: payload,
		method: "POST",
		headers: {
			...headers,
			origin: "https://server.instasave.website",
			referer: "https://server.instasave.website",
		}
	}))
	const $ = cheerio.load(body.body);
	let results: InstagramDownloaderV2[] = [];
	if (Boolean($("#downloadBox > a").length)) {
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
	if (!results.length) throw new ScraperError(`Can't download!\n${$.html()}`)
	return results
}

export async function instagramdlv4(url: string): Promise<InstagramDownloaderV4[]> {
	const payload = {
		url: encodeURIComponent(url),
	}
	const data: string = await got('https://instadownloader.co/insta_downloader.php', {
		headers: {
			cookie: "PHPSESSID=dbe8354b8babda16509d1937c61f3283; _ga=GA1.2.1733350350.1642305936; _gid=GA1.2.372020418.1642305936; _gat=1; __gads=ID=b4bd840227b997e8-22bf10a0f9cf00c8:T=1642305940:RT=1642305940:S=ALNI_MYAmf2IjxwGlzs5qXm4WFoP5pgocg",
			referer: "https://instadownloader.co/id/",
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
		},
		searchParams: new URLSearchParams(
			Object.entries(payload) as string[][]
		),
	}).json()
	const json: {
		images_links: InstagramDownloaderV4[];
		videos_links: InstagramDownloaderV4[]
	} = JSON.parse(data)
	return [
		...json.images_links,
		...json.videos_links
	] as InstagramDownloaderV4[]
}

export async function instagramStory(name: string): Promise<InstagramStory> {
	let params = {
		username: name,
		b: 0,
		t: Date.now(),
	}
	let data: string
	for (let i = 0; i < 5; i++) {
		params.b = i
		data = await got('https://www.insta-stories.net/data.php', {
			searchParams: new URLSearchParams(
				Object.entries(params) as string[][]
			)
		}).text()
		if (data !== 'nostory') break
	}
	const $ = cheerio.load(data);
	let results: InstagramStory['results'] = [];
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
	if (!results.length) throw new ScraperError(`Can't download!\n${$.html()}`)
	return {
		user: {
			username: name
		},
		results
	}
}

export async function instagramStoryv2(name: string): Promise<InstagramStoryv2> {
	const headers: Headers = {
		accept: "*/*",
		cookie: '_ga=GA1.2.1814586753.1642307018; _gid=GA1.2.136857157.1642307018; __gads=ID=6f5ca6608dd8b1e9-22e4ea18ffcf0077:T=1642307019:RT=1642307019:S=ALNI_MZA7NeGtOEcSPXyFhf4LY8w7Myg9g; PHPSESSID=1i9dscs75l6v2h17cvdtd587b4; _gat=1; FCNEC=[["AKsRol9R3FQaOjrrETFMIMIvWtuoY3xRHpQEPHMujRWOd_nxuLgWCSyYK9lLC3ev0L5V8fuaSIjhupCtaReRepP4qNvch536pzvrcU13Gh8CRHSEIh8O3zM42ASwGUQfjoKbxkTV1L15EA6O7FLZ-Qh3Fy1rvh_h8w=="],null,[]]',
		"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
	};
	const data = await got("https://www.instagramsave.com/instagram-story-downloader.php", {
		headers: {
			...headers,
			accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			referer: "https://www.google.com/"
		}

	}).text()
	const $ = cheerio.load(data)
	const payload = {
		url: "https://www.instagram.com/" + name,
		action: "story",
		token: $("#token").val() as string,
		json: ""
	}
	const { user, medias: results, error }: {
		user: {
			id: string;
			username: string;
			fullName: string;
			profilePicUrl: string;
			biography: string;
			followers: number;
			following: number;
		}
		medias: {
			type: string;
			fileType: string;
			url: string;
			downloadUrl: string;
			preview: string;
		}[];
		error?: string;
	} = await got("https://www.instagramsave.com/system/action.php", {
		form: payload,
		method: "POST",
		headers: {
			...headers,
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
			origin: "https://www.instagramsave.com",
			referer: "https://www.instagramsave.com/instagram-story-downloader.php",
		}
	}).json()
	if (error || !results) throw new ScraperError(`Maybe user ${name} not have story!!\n${JSON.stringify({ user, results, payload }, null, 2)}`)
	return {
		user,
		results: results.map(({ preview, url, downloadUrl, type, fileType }) => ({
			thumbnail: preview,
			url: downloadUrl,
			sourceUrl: url,
			type,
			fileType,
			isVideo: type === "video"
		}))
	}
}
