import { expect } from "chai";
import {
	facebookdl,
	googleIt,
	instagramdl,
	instagramdlv2,
	instagramStory,
	tiktokdl,
	tiktokfyp,
	twitterdl,
	twitterdlv2,
	youtubedl,
	youtubedlv2,
	youtubeSearch,
} from ".";

describe("Social media", () => {
	describe("Tiktok scraper", function () {
		it("tiktokdl", async function () {
			const res = await tiktokdl(
				"https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226"
			);
			expect(res).to.be.an("object");
			expect(res.author).to.be.an("object");
			expect(res.description).to.be.a("string");
			expect(res.video).to.be.an("object");
			expect(res.music).to.be.a("string");
		});
		// it("tiktokdl v2", async function () {
		// 	const res = await tiktokdlv2(
		// 		"https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226"
		// 	);
		// 	expect(res).to.be.an("object");
		// 	expect(res.author).to.be.an("object");
		// 	expect(res.video).to.be.an("object");
		// }); // Github action error!

		it("tiktokfyp", async function () {
			const res = await tiktokfyp();

			expect(res).to.be.an("array");
			expect(res.length).to.be.above(0);
		});

		// it("tiktokstalk", async function () {
		// 	const res = await tiktokstalk("Tiktok");
		// 	expect(res).to.be.an("object");
		// 	expect(res.username).to.be.a('string')
		// 	expect(res.profile).to.be.a('string')
		// 	expect(res.avatar).to.be.a('string')
		// 	expect(res.verified).to.be.a('boolean')   Github action error!
		// 	expect(res.following).to.be.a('string')
		// 	expect(res.followers).to.be.a('string')
		// 	expect(res.likes).to.be.a('string')
		// 	expect(res.description).to.be.a('string')
		// });
	});

	describe("Instagram", () => {
		it("Instagram Downloader", async () => {
			const res = await instagramdl(
				"https://www.instagram.com/reel/CXK49yFLtJ_/?utm_source=ig_web_copy_link"
			);
			expect(res).to.be.an("array");
			expect(res).to.have.lengthOf.at.least(1);
			res.forEach(({ thumbnail, url }) => {
				expect(thumbnail).instanceof(Buffer);
				expect(url).to.be.a("string");
			});
		});

		it("Instagram Downloader V2", async () => {
			const res = await instagramdlv2(
				"https://www.instagram.com/reel/CXK49yFLtJ_/?utm_source=ig_web_copy_link"
			);
			expect(res).to.be.an("array");
			expect(res).to.have.lengthOf.at.least(1);
			res.forEach(({ thumbnail, url }) => {
				expect(thumbnail).to.be.a("string");
				expect(url).to.be.a("string");
			});
		});

		it("Instagram Story", async function () {
			const res = await instagramStory("freefirebgid");

			expect(res).to.be.an("array");
			res.forEach(({ thumbnail, isVideo, url }) => {
				expect(thumbnail).to.be.a("string");
				expect(isVideo).to.be.a("boolean");
				expect(url).to.be.a("string");
			});
		});
	});

	describe("Facebook (Metaverse :V)", function () {
		it("Facebook Downloader", async () => {
			const res = await facebookdl("https://fb.watch/9WktuN9j-z/");
			expect(res).to.be.an("object");
			expect(res.id).to.be.a("string");
			expect(res.thumbnail).to.be.a("string");
			expect(res.duration).to.be.a("number");
			expect(res.result).to.be.an("array");
			res.result.forEach(({ ext, url, isVideo, isAudio }) => {
				expect(ext).to.be.a("string");
				expect(url).to.be.a("string");
				expect(isVideo).to.be.a("boolean");
				expect(isAudio).to.be.a("boolean");
			});
		});

		// it("Facebook Downloader V2", async () => {
		// 	const res = await facebookdlv2("https://fb.watch/9WktuN9j-z/");

		// 	expect(res).to.be.an("object");
		// 	expect(res.id).to.be.a("string");
		// 	expect(res.thumbnail).to.be.a("string");
		// 	expect(res.result).to.be.an("array");
		// 	res.result.forEach(({ quality, url }) => {
		// 		expect(quality).to.be.a("string");
		// 		expect(url).to.be.a("string");
		// 	});
		// });
	});

	describe("Twitter", () => {
		it("Twitter Downloader", async () => {
			const res = await twitterdl(
				"https://twitter.com/jen_degen/status/1458167531869458440?s=20"
			);

			expect(res).to.be.an("array");
			res.forEach(({ quality, type, url, isVideo }) => {
				expect(quality).to.be.a("string");
				expect(type).to.be.a("string");
				expect(url).to.be.a("string");
				expect(isVideo).to.be.a("boolean");
			});
		});

		it("Twitter Downloader V2", async () => {
			const res = await twitterdlv2(
				"https://twitter.com/jen_degen/status/1458167531869458440?s=20"
			);
			expect(res).to.be.an("array");
			res.forEach(({ quality, type, url }) => {
				expect(quality).to.be.a("string");
				expect(type).to.be.a("string");
				expect(url).to.be.a("string");
			});
		});
	});

	describe("Youtube", function () {
		it("Youtube Downloader", async () => {
			const res = await youtubedl("https://youtu.be/iik25wqIuFo");

			expect(res).to.be.an("object");
			expect(res.thumbnail).to.be.a("string");
			expect(res.title).to.be.a("string");
			expect(res.video).to.be.an("object");
			expect(res.audio).to.be.an("object");
		});

		it("Youtube Downloader v2", async () => {
			const res = await youtubedlv2("https://youtu.be/nETHrCFb17I");

			expect(res).to.be.an("object");
			expect(res.thumbnail).to.be.a("string");
			expect(res.title).to.be.a("string");
			expect(res.video).to.be.an("object");
			expect(res.audio).to.be.an("object");
		});

		it("Youtube Search", async () => {
			const res = await youtubeSearch("Minecraft");

			expect(res).to.be.an("object");
			expect(res.video).to.be.an("array");
			expect(res.video).to.have.lengthOf.at.least(1);
			expect(res.channel).to.be.an("array");
			expect(res.playlist).to.be.an("array");
		});
	});

	it("Google It", async () => {
		const res = await googleIt("Minecraft");

		expect(res).to.be.an("object");
		expect(res.info).to.be.an("object");
		expect(res.articles).to.be.an("array");
		expect(res.articles).to.have.lengthOf.at.least(1);
	});
});
