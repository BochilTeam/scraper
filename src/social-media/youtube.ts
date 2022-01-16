import cheerio from "cheerio";
import got from "got";
import { YoutubeDownloader, YoutubeVideoOrAudio } from "./types";

interface IresFetch {
	status: string;
	result: string;
}

// https://github.com/BochilGaming/games-wabot/blob/main/lib/y2mate.js
const servers = ["en163", "id90"];
export async function youtubedl(
	url: string,
	server: string = "en163"
): Promise<YoutubeDownloader> {
	if (!servers.includes(server)) server = servers[0];
	const params: { url: string; q_auto: number; ajax: number } = {
		url: url,
		q_auto: 0,
		ajax: 1,
	};
	const json: IresFetch = await got
		.post(`https://www.y2mate.com/mates/${server}/analyze/ajax`, {
			headers: {
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
				cookie:
					"_ga=GA1.2.1405332118.1641699259; _gid=GA1.2.1117783105.1641699259",
				origin: "https://www.y2mate.com",
			},
			form: params,
		})
		.json();
	const $ = cheerio.load(json.result);
	const id = (/var k__id = "(.*?)"/.exec($.html()) || ["", ""])[1];
	const v_id = (/var k_data_vid = "(.*?)"/.exec($.html()) || ["", ""])[1];
	const thumbnail = $(".video-thumbnail > img").attr("src");
	const title = $("div.caption > b").text().trim();
	let video: YoutubeVideoOrAudio = {};
	let audio: YoutubeVideoOrAudio = {};
	$("#mp4 > table > tbody > tr").each(function () {
		const el = $(this).find("td");
		const _quality = el.eq(0).find("a").text();
		const quality = _quality.split("(")?.[0]?.trim()?.toLowerCase();
		const fileSizeH = el.eq(1).text();
		if (!/\.3gp/i.test(_quality))
			video[quality] = {
				quality,
				fileSizeH,
				fileSize: parseFloat(fileSizeH) * (/MB$/.test(fileSizeH) ? 1000 : 1),
				download: convert.bind(
					null,
					id,
					v_id,
					"mp4",
					quality.replace(/p/i, "")
				),
			};
	});
	$("#mp3 > table > tbody > tr").each(function () {
		const el = $(this).find("td");
		const _quality = el.eq(0).find("a").text();
		const quality = _quality
			.split("(")?.[1]
			?.replace(")", "")
			?.trim()
			?.toLowerCase();
		const fileSizeH = el.eq(1).text();
		audio[quality] = {
			quality,
			fileSizeH,
			fileSize: parseFloat(fileSizeH) * (/MB$/.test(fileSizeH) ? 1000 : 1),
			download: convert.bind(
				null,
				id,
				v_id,
				"mp3",
				quality.replace(/kbps/i, "")
			),
		};
	});
	return {
		id,
		v_id,
		thumbnail,
		title,
		video,
		audio,
	};
}

interface IresLinks {
	f: string;
	k: string;
	key: string;
	q: string;
	selected?: string;
	size: string;
}

export async function youtubedlv2(url: string): Promise<YoutubeDownloader> {
	const html = await got("https://yt5s.com/en32").text();
	const urlAjax = (/k_url_search="(.*?)"/.exec(html) || ["", ""])[1];
	const urlConvert = (/k_url_convert="(.*?)"/.exec(html) || ["", ""])[1];
	const params: { [Key: string]: string } = {
		q: url,
		vt: "home",
	};
	const json: {
		vid: string;
		title: string;
		a: string;
		token: string;
		timeExpires: string;
		fn: string;
		links: {
			[Key: string]: {
				[Key: string]: IresLinks;
			};
		};
	} = await got(urlAjax, {
		method: "POST",
		headers: {
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
			cookie:
				"__cflb=04dToSoFRg9oqH9pYF2En9gKJK4fe8D9TcYtUD6tYu; _ga=GA1.2.1350132744.1641709803; _gid=GA1.2.1492233267.1641709803; _gat_gtag_UA_122831834_4=1",
			origin: "https://yt5s.com",
			"user-agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
		},
		searchParams: new URLSearchParams(Object.entries(params) as string[][]),
	}).json();
	let video: YoutubeVideoOrAudio = {};
	Object.values(json.links.mp4).forEach(({ k, size }: IresLinks) => {
		video[k] = {
			quality: k,
			fileSizeH: size,
			fileSize: parseFloat(size) * (/MB$/.test(size) ? 1000 : 1),
			download: convertv2.bind(
				null,
				urlConvert,
				json.vid,
				"mp4",
				k,
				json.token,
				parseInt(json.timeExpires),
				json.fn
			),
		};
	});
	let audio: YoutubeVideoOrAudio = {};
	Object.values(json.links.mp3).forEach(({ key, size }: IresLinks) => {
		audio[key] = {
			quality: key,
			fileSizeH: size,
			fileSize: parseFloat(size) * (/MB$/.test(size) ? 1000 : 1),
			download: convertv2.bind(
				null,
				urlConvert,
				json.vid,
				"mp3",
				key.replace(/kbps/i, ""),
				json.token,
				parseInt(json.timeExpires),
				json.fn
			),
		};
	});
	return {
		id: json.vid,
		title: json.title,
		thumbnail: `https://i.ytimg.com/vi/${json.vid}/0.jpg`,
		video,
		audio,
	};
}

async function convert(
	_id: string,
	v_id: string,
	ftype: string,
	fquality: number
): Promise<string> {
	const params: { [Key: string]: string | number; fquality: number } = {
		type: "youtube",
		_id,
		v_id,
		ajax: "1",
		token: "",
		ftype,
		fquality,
	};

	const json: IresFetch = await got("https://www.y2mate.com/mates/convert", {
		method: "POST",
		headers: {
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
			cookie:
				"_ga=GA1.2.1405332118.1641699259; _gid=GA1.2.1117783105.1641699259; MarketGidStorage=%7B%220%22%3A%7B%7D%2C%22C702514%22%3A%7B%22page%22%3A2%2C%22time%22%3A1641701743540%7D%7D; _PN_SBSCRBR_FALLBACK_DENIED=1641701744162",
			"user-agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
		},
		searchParams: new URLSearchParams(Object.entries(params) as string[][]),
	}).json();
	const $ = cheerio.load(json.result);
	return $("a[href]").attr("href");
}

function convertv2(
	url: string,
	v_id: string,
	ftype: string,
	fquality: string,
	token: string,
	timeExpire: number,
	fname: string
): Promise<string> {
	return new Promise<string>(async (resolve, reject) => {
		const params: { [Key: string]: string | number } = {
			v_id,
			ftype,
			fquality,
			token,
			timeExpire,
			client: "yt5s.com",
		};
		const resServer: { c_server?: string; d_url?: string; c_status: string } =
			await got(url, {
				method: "POST",
				headers: {
					"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
					origin: "https://yt5s.com",
					referer: "https://yt5s.com/",
					"user-agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
					"X-Requested-Key": "de0cfuirtgf67a",
				},
				searchParams: new URLSearchParams(Object.entries(params) as string[][]),
			}).json();
		let server = resServer.c_server;
		if (!server && ftype == "mp3") return resolve(server || resServer.d_url);
		const payload: { [Key: string]: string | number } = {
			v_id,
			ftype,
			fquality,
			fname,
			token,
			timeExpire,
		};
		const results: {
			status: string;
			jobId?: string;
			statusCode: number;
			result: string;
		} = await got(`${server}/api/json/convert`, {
			method: "POST",
			searchParams: new URLSearchParams(Object.entries(payload) as string[][]),
		}).json();
		if (results.statusCode === 200) return resolve(results.result);
		else if (results.statusCode === 300) {
			try {
				const WebSocket = require("ws");
				const Url = new URL(server);
				const WSUrl = `${/https/i.test(Url.protocol) ? "wss:" : "ws:"}//${
					Url.host
				}/sub/${results.jobId}?fname=yt5s.com`;
				const ws = new WebSocket(WSUrl, undefined, {
					headers: {
						"Accept-Encoding": "gzip, deflate, br",
						Host: Url.host,
						Origin: "https://yt5s.com",
						"Sec-WebSocket-Extensions":
							"permessage-deflate; client_max_window_bits",
						"User-Agent":
							"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
					},
				});
				ws.on("message", function incoming(message: Buffer) {
					const msg: { action: string; url: string } = JSON.parse(
						message.toString()
					);
					if (msg.action === "success") {
						ws.close(0);
						ws.removeAllListeners("message");
						return resolve(msg.url);
					} else if (msg.action === "error") return reject(msg);
				});
			} catch (e) {
				console.error(e);
				return reject(e);
			}
		} else return reject(results);
	});
}
