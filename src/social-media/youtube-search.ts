import cheerio from "cheerio";
import got from "got";
import { YoutubeSearch } from "./types";

type Ithumbnails = { url: string; width: number; height: number };
export default async function youtubeSearch(
	query: string
): Promise<YoutubeSearch> {
	const body = await got(`https://www.youtube.com/results`, {
		headers: {
			"user-agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
		},
		searchParams: {
			search_query: query,
		},
	}).text();
	const $ = cheerio.load(body);
	let sc: { [Key: string]: any };
	$("script").map(function () {
		const el = $(this).html();
		let regex: RegExpExecArray;
		if ((regex = /var ytInitialData = /gi.exec(el)))
			sc = JSON.parse(
				regex.input.replace(/^var ytInitialData = /i, "").replace(/;$/, "")
			);
	});
	const results: YoutubeSearch = { video: [], channel: [], playlist: [] };
	(
		sc.contents.twoColumnSearchResultsRenderer.primaryContents
			.sectionListRenderer.contents[0].itemSectionRenderer.contents as any[]
	).forEach((v: { [Key: string]: any }, i) => {
		const typeName = Object.keys(v)[0];
		const result = v[typeName];
		if (["horizontalCardListRenderer", "shelfRenderer"].includes(typeName))
			return; // Todo: add this result as results
		const isChannel = typeName === "channelRenderer";
		const isVideo = typeName == "videoRenderer";
		const isMix = typeName === "radioRenderer";

		if (isVideo) {
			let view: string =
				result.viewCountText?.simpleText ||
				result.shortViewCountText?.simpleText ||
				result.shortViewCountText?.accessibility?.accessibilityData.label,
				_duration = result.thumbnailOverlays?.find(
					(v: { [Key: string]: any }) =>
						Object.keys(v)[0] === "thumbnailOverlayTimeStatusRenderer"
				)?.thumbnailOverlayTimeStatusRenderer.text,
				videoId: string = result.videoId,
				duration: string =
					result.lengthText?.simpleText || _duration?.simpleText,
				durationS: number = 0;
			(
				duration?.split(".").length && duration.indexOf(":") == -1 ?
					duration.split(".") :
					duration?.split(":")
			)?.forEach(
				(v, i, arr) =>
				(durationS +=
					durationMultipliers[arr.length]["" + i] * parseInt(v))
			);
			results.video.push({
				authorName: (result.ownerText?.runs ||
					result.longBylineText?.runs ||
					[])[0]?.text,
				authorAvatar:
					result.channelThumbnailSupportedRenderers?.channelThumbnailWithLinkRenderer.thumbnail.thumbnails
						?.filter(({ url }: Ithumbnails) => url)
						?.pop().url,
				videoId,
				url: encodeURI("https://www.youtube.com/watch?v=" + videoId),
				thumbnail: result.thumbnail.thumbnails.pop().url,
				title: (
					result.title?.runs.find((v: { [Key: string]: any }) => v.text)?.text ||
					result.title?.accessibility.accessibilityData.label
				)?.trim(),
				description: result.detailedMetadataSnippets?.[0]?.snippetText.runs
					?.filter(({ text }: { text: string }) => text)
					?.map(({ text }: { text: string }) => text)
					?.join(""),
				publishedTime: result.publishedTimeText?.simpleText,
				durationH:
					result.lengthText?.accessibility.accessibilityData.label ||
					_duration?.accessibility.accessibilityData.label,
				durationS,
				duration,
				viewH: view,
				view: (
					(view?.indexOf("x") === -1
						? view?.split(" ")[0]
						: view?.split("x")[0]) || view
				)?.trim(),
				type: typeName.replace(/Renderer/i, "") as "video",
			});
		}

		if (isChannel) {
			const channelId: string = result.channelId,
				_subscriber: string =
					result.subscriberCountText?.accessibility.accessibilityData.label ||
					result.subscriberCountText?.simpleText;
			results.channel.push({
				channelId,
				url: encodeURI("https://www.youtube.com/channel/" + channelId),
				channelName:
					result.title.simpleText ||
					result.shortBylineText?.runs.find(
						(v: { [Key: string]: any }) => v.text
					)?.text,
				avatar:
					"https:" +
					result.thumbnail.thumbnails
						.filter(({ url }: Ithumbnails) => url)
						?.pop().url,
				isVerified:
					result.ownerBadges?.pop().metadataBadgeRenderer.style ===
					"BADGE_STYLE_TYPE_VERIFIED",
				subscriberH: _subscriber?.trim(),
				subscriber: _subscriber?.split(" ")[0],
				videoCount: parseInt(result.videoCountText?.runs[0]?.text),
				description: result.descriptionSnippet?.runs
					?.filter(({ text }: { text: string }) => text)
					?.map(({ text }: { text: string }) => text)
					?.join(""),
				type: typeName.replace(/Renderer/i, "") as "channel",
			});
		}

		if (isMix)
			results.playlist.push({
				playlistId: result.playlistId,
				title: result.title.simpleText,
				thumbnail: result.thumbnail.thumbnails.pop().url,
				video: result.videos.map(({ childVideoRenderer }) => {
					return {
						videoId: childVideoRenderer.videoId,
						title: childVideoRenderer.title.simpleText,
						durationH:
							childVideoRenderer.lengthText.accessibility
								.accessibilityData.label,
						duration: childVideoRenderer.lengthText.simpleText,
					};
				}),
				type: "mix",
			});
	});
	return results;
}

const durationMultipliers: { [key: string]: { [key: string]: number } } = {
	"1": {
		"0": 1,
	},
	"2": {
		"0": 60,
		"1": 1,
	},
	"3": {
		"0": 3600,
		"1": 60,
		"2": 1,
	},
};
