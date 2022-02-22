import cheerio from "cheerio";
import got, { Headers, Response } from "got";
import type {
	InstagramDownloader,
	InstagramDownloaderV2,
	InstagramDownloaderV4,
	InstagramStory,
	InstagramStoryv2,
	InstagramStalk
} from "./types";
import { ScraperError, decodeSnapApp } from "../utils";

export async function instagramdl(url: string): Promise<InstagramDownloader[]> {
	if (!/https?:\/\/www\.instagram\.com\/(reel|tv|p)\//i.test(url))
		throw "Invalid url!!";

	const data = await got
		.post("https://snapinsta.app/action.php", {
			form: {
				url: encodeURI(url),
				action: "post",
			},
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				origin: "https://snapinsta.app",
				referer: "https://snapinsta.app/",
				"user-agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
			},
		})
		.text();
	const params = data.split('))</script>')[0]
		.split('decodeURIComponent(escape(r))}(')[1]
		?.split(',').map(v => v.replace(/^"/, '')
			.replace(/"$/, '').trim());
	console.log(params)
	if (!Array.isArray(params) || params.length !== 6) throw new ScraperError(`Can't download!\n${data}`)
	const decode = decodeSnapApp(...params)
	const html = decode?.split('("div_download").innerHTML = "')?.[1]
		.split('"; parent.document.getElementById("hero-section").remove();')[0]
		.split('</style> <section class=')[1].split('"> ')[1]
		?.split(' </section> ')[0].replace(/\\(\\)?/g, '');
	const $ = cheerio.load(html);
	let results: InstagramDownloader[] = [];
	$(".row.download-box > div.col-md-4").each(function () {
		let thumbnail = $(this)
			.find(".download-items__thumb > img[src]")
			.attr("src")
		if (!/https?:\/\//i.test(thumbnail)) thumbnail = "https://snapinsta.app" + thumbnail
		let url = $(this).find(".download-items__btn > a[href]").attr("href");
		if (!/https?:\/\//i.test(url))
			url = encodeURI("https://snapinsta.app" + url);
		results.push({ thumbnail, url });
	});
	if (!results.length) throw new ScraperError(`Can't download!\n${decode}`)
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
		link: encodeURI(url),
		submit: ""
	}, headers: Headers = {
		"content-type": "application/x-www-form-urlencoded",
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
			Object.entries(payload) as [string, string][]
		),
	}).json()
	const json: {
		images_links: InstagramDownloaderV4[];
		videos_links: InstagramDownloaderV4[]
	} = JSON.parse(data)
	if (!(json.images_links.length || json.videos_links.length)) throw new ScraperError(`Can't download!\n${JSON.stringify(json, null, 2)}`)
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
				Object.entries(params) as [string, string][]
			),
			headers: {
				Cookie: '__gads=ID=a0129f64c017a213-2229f80500d0003f:T=1642402102:RT=1642402102:S=ALNI_MYpfNSDYSzzQdpadtBXJczU1ZrfKQ; FCNEC=[["AKsRol8c44yP5_EyHSe8zIa4WwUMzK96oz8pPcTILK6NBeERGaGQTAoVdmG95d2DWhkj71HeAJEKMBmudTLabT_7FubgP2ES5eiqmI3458TB2AL6HSJtR0c7ZUiC3c8K-Da1kNJD5dKtON5UulOJWOsEO3tS1zERdA=="],null,[]]',
				Host: 'www.insta-stories.net',
				Referer: 'https://www.insta-stories.net/',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
			}
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

export async function instagramStalk(username: string): Promise<InstagramStalk> {
	const data = await got(`https://dumpor.com/search?query=${encodeURIComponent(username).replace(/%20/g, '+')}`).text()
	const $ = cheerio.load(data)
	const accounts: { url: string, avatar: string, username: string }[] = []
	$('#nav-profiles > div > div.search-item').each(function () {
		const el = $(this)
		accounts.push({
			url: el.find('.content__img-wrap > a')
				.attr('href')?.trim(),
			avatar: el.find('.content__img-wrap > a > img')
				.attr('src')?.trim(),
			username: el.find('.content__text > a')
				.text().trim()
		})
	})
	const html = await got(`https://dumpor.com/${accounts[0].url}`).text()
	const $$ = cheerio.load(html)
	const name = $$('div.user__title > a > h1').text().trim()
	const Uname = $$('div.user__title > h4').text().trim()
	const description = $$('div.user__info-desc').text().trim()
	const row = $$('#user-page > div.container > div > div > div:nth-child(1) > div > a')
	const postsH = row.eq(0).text().replace(/Posts/i, '')?.trim()
	const followersH = row.eq(2).text().replace(/Followers/i, '')?.trim()
	const followingH = row.eq(3).text().replace(/Following/i, '')?.trim()
	const list = $$('ul.list > li.list__item')
	const posts = parseInt(
		list.eq(0).text().replace(/Posts/i, '')
			?.trim()?.replace(/\s/g, '')
	)
	const followers = parseInt(
		list.eq(1).text().replace(/Followers/i, '')
			?.trim()?.replace(/\s/g, '')
	)
	const following = parseInt(
		list.eq(2).text().replace(/Following/i, '')
			?.trim()?.replace(/\s/g, '')
	)
	return {
		name,
		username: Uname,
		description,
		postsH,
		posts,
		followersH,
		followers,
		followingH,
		following,
	}
}