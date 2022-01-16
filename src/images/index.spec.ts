import { expect } from "chai";
import {
	googleImage,
	pinterest,
	stickerLine,
	stickerTelegram,
	wallpaper,
	wallpaperv2,
} from ".";

describe("Images", () => {
	it("google-image", async () => {
		const result = await googleImage("Minecraft");
		expect(result).to.be.an("array");
		result.forEach((v) => expect(v).to.be.a("string"));
	});

	it("pinterest", async () => {
		const result = await pinterest("Minecraft");

		expect(result).to.be.an("array");
		result.forEach((v) => expect(v).to.be.a("string"));
	});

	describe("Wallpaper", () => {
		it("wallpaper", async () => {
			const result = await wallpaper("Minecraft");
			expect(result).to.be.an("array");
			result.forEach((v) => expect(v).to.be.a("string"));
		});

		it("wallpaper V2", async () => {
			const result = await wallpaperv2("Wallpaper Anime");

			expect(result).to.be.an("array");
			result.forEach((v) => expect(v).to.be.a("string"));
		});
	});

	it("Sticker Telegram", async () => {
		const result = await stickerTelegram("Minecraft");
		expect(result).to.be.an("array");
		result.forEach((v) => expect(v).to.be.an("object"));
	});

	it("Sticker Line", async () => {
		const result = await stickerLine("Anime");

		expect(result).to.be.an("array");
		result.forEach((v) => expect(v).to.be.an("object"));
	});
});
