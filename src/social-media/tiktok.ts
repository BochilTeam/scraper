import got from "got";
import { TiktokDownloader, TiktokDownloaderv2, TiktokFyp } from "./types";

export async function tiktokdl(url: string): Promise<TiktokDownloader | {}> {
	if (/v[tm]\.tiktok\.com/g.test(url)) {
		let res = await got(url);
		url = res.url;
	}
	let res = await got(
		`https://api.snaptik.site/video-key?video_url=${url}`
	).json();
	if (res["status"] != "success")
		throw new Error("Failed to get TikTok video key");
	let data = await got(
		`https://api.snaptik.site/video-details-by-key?key=${res["data"]["key"]}`
	).json();
	if (data["status"] != "success")
		throw new Error("Failed to get TikTok video details");

	const results: TiktokDownloader = {
		author: { ...data["data"]["author"] },
		description: data["data"]["description"],
		video: {
			with_watermark: `https://api.snaptik.site/download?key=${data["data"]["video"].with_watermark}&type=video`,
			no_watermark: `https://api.snaptik.site/download?key=${data["data"]["video"].no_watermark}&type=video`,
			no_watermark_raw: data["data"]["video"].no_watermark_raw,
		},
		music: `https://api.snaptik.site/download?key=${data["data"]["music"]}&type=music`,
	};
	return results;
}

export async function tiktokdlv2(url: string): Promise<TiktokDownloaderv2> {
	const data: {
		author_avatar: string;
		author_id: string;
		author_name: string;
		comment_count: number;
		create_time: string;
		id: string;
		like_count: number;
		share_count: number;
		success: boolean;
		token: string;
	} = await got
		.post("https://api.tikmate.app/api/lookup", {
			headers: {
				accept: "*/*",
				"accept-language": "en-US,en;q=0.9",
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
				origin: "https://tikmate.app",
				referer: "https://tikmate.app/",
				"user-agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
			},
			form: { url },
		})
		.json();
	return {
		author: {
			unique_id: data.author_id,
			nickname: data.author_name,
			avatar: data.author_avatar,
		},
		video: {
			no_watermark: `https://tikmate.app/download/${data.token}/${data.id}.mp4`,
			no_watermark_hd: `https://tikmate.app/download/${data.token}/${data.id}.mp4?hd=1`,
		},
	};
}

export async function tiktokfyp(): Promise<TiktokFyp[] | []> {
	const data: { itemList: TiktokFyp[] } = await got(
		`https://t.tiktok.com/api/recommend/item_list/?aid=1988&app_name=tiktok_web&device_platform=web_pc&device_id=6982004129280116226&region=ID&priority_region=&os=windows&referer=&cookie_enabled=true&screen_width=1920&screen_height=1080&browser_language=en-US&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F96.0.4664.93+Safari%2F537.36&browser_online=true&verifyFp=verify_kx30laei_YkR2lQiI_UBWz_4MZK_ACKV_loiPDs4PyDtw&app_language=en&timezone_name=Asia%2FJakarta&is_page_visible=true&focus_state=true&is_fullscreen=false&history_len=2&battery_info=%7B%7D&count=30&itemID=1&language=en&from_page=fyp&insertedItemID=&versions=70232694,70338434,70001178,70138197,70156809&msToken=Wi63JD_P7xxD_7pFmaF_UcHM6oJwSKjR9wnfsMUaDdz51KLZ3J8tazDrcY2gh_t3PyG_5926qyw8g7DhrgFa3mbDmxLhzmLs_3l_sOk4zf6TdMqfAT51s_n8ZPG8vovv76h1kCkR&X-Bogus=DFSzswVOAxxANJf/SEhC1eM/W7oh&_signature=`
	).json();
	return (data.itemList as TiktokFyp[]) || [];
}

// export async function tiktokstalk(name: string): Promise<{
//     username: string;
//     profile: string;
//     avatar: string;
//     verified: boolean;
//     following: string;
//     followers: string;
//     likes: string;
//     description: string;
// }> {
//     const { data } = await axios.get(`https://www.tiktok.com/@${name}?lang=en`, {
//         headers: {
//             accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//             cookie: 'tt_csrf_token=hlVsM4KILUl4mGcUkB6w6FJR; s_v_web_id=verify_kx30laei_YkR2lQiI_UBWz_4MZK_ACKV_loiPDs4PyDtw; ttwid=1%7CY1AOcjfoIgvlYizkFtt8slCK0i4qZqApyt2VHzQW2jY%7C1639301134%7C43c115b2541a4ae28ba3b0f194641f223a4a3b18a3fcf83212c133eaf4518b04; msToken=9Ac544Pz7Cc_nUXjNNhx8MBVx96CEeL0mgtWiPUQ5Ef3XxRI81YIpRNDkWa3TM5mqAFr-rhaNE1HWEXop_kpLp4BTCqhLQdu3ppGSbLHhUnqEKmzpF86bWvmur5xyKDCVmE63Q==',
//             'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36'
//         }
//     })
//     const $ = cheerio.load(data)
//     let container = $('div.share-title-container > h2')
//     let username = container.text()?.trim()
//     let avatar = $('span.tiktok-avatar.tiktok-avatar-circle.avatar > img').attr('src')
//     let verified = /verified$/.test(container.attr('class'))
//     let profile = $('h1.share-sub-title > span.profile').text()?.trim()
//     let stats = $('h2.count-infos > div.number')
//     let following = stats.eq(0).find('strong').text()?.trim()
//     let followers = stats.eq(1).find('strong').text()?.trim()
//     let likes = stats.eq(2).find('strong').text()?.trim()
//     let description = $('h2.share-desc').text()?.trim()
//     return {
//         username,
//         profile,
//         avatar,
//         verified,
//         following,
//         followers,
//         likes,
//         description
//     }
// }

// export async function tiktoksearch(query: string) {
//     const { data } = await axios.get(`https://www.tiktok.com/search?q=${query}&t=${+new Date()}`)
//     const $ = cheerio.load(data)
// }
