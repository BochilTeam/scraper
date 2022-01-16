import { expect } from "chai";
import {
	asahotak,
	asahotakjson,
	caklontong,
	caklontongjson,
	family100,
	family100json,
	siapakahaku,
	siapakahakujson,
	susunkata,
	susunkatajson,
	tebakbendera,
	tebakbenderajson,
	tebakgambar,
	tebakgambarjson,
	tebakkabupaten,
	tebakkabupatenjson,
	tebakkata,
	tebakkatajson,
	tebakkimia,
	tebakkimiajson,
	tebaklirik,
	tebaklirikjson,
	tebaktebakan,
	tebaktebakanjson,
	tekateki,
	tekatekijson,
} from ".";

describe("Games", () => {
	describe("Tebakgambar", () => {
		it("tebakgambar", async () => {
			const result = await tebakgambar();
			expect(result).to.an("object");
			expect(result.index).to.a("number");
			expect(result.img).to.a("string");
			expect(result.jawaban).to.a("string");
			expect(result.deskripsi).to.a("string");
		});

		it("tebakgambar JSON", () => {
			let res = tebakgambarjson;
			expect(res).to.an("array");
			expect(res).to.have.lengthOf.at.least(1000);
		});
	});

	describe("Asahotak", () => {
		it("asahotak", async () => {
			const result = await asahotak();
			expect(result).to.an("object");
			expect(result.index).to.a("number");
			expect(result.soal).to.a("string");
			expect(result.jawaban).to.a("string");
		});

		it("asahotak JSON", () => {
			let res = asahotakjson;
			expect(res).to.an("array");
			expect(res).to.have.lengthOf.at.least(228);
		});
	});

	describe("Caklontong", () => {
		it("caklontong", async () => {
			const result = await caklontong();
			expect(result).to.an("object");
			expect(result.index).to.a("number");
			expect(result.soal).to.a("string");
			expect(result.jawaban).to.a("string");
			expect(result.deskripsi).to.a("string");
		});

		it("caklontong JSON", () => {
			let res = caklontongjson;
			expect(res).to.an("array");
			expect(res).to.have.lengthOf.at.least(414);
		});
	});

	describe("Family 100", () => {
		it("family100", async () => {
			const result = await family100();
			expect(result).to.an("object");
			expect(result.soal).to.a("string");
			expect(result.jawaban).to.a("array");
		});

		it("family100 JSON", () => {
			let res = family100json;
			expect(res).to.an("array");
			expect(res).to.have.lengthOf.at.least(7152);
		});
	});

	describe("TebakKata", () => {
		it("tebakkata", async () => {
			const result = await tebakkata();
			expect(result).to.an("object");
			expect(result.index).to.a("number");
			expect(result.soal).to.a("string");
			expect(result.jawaban).to.a("string");
		});

		it("tebakkata JSON", () => {
			let res = tebakkatajson;
			expect(res).to.an("array");
			expect(res).to.have.lengthOf.at.least(302);
		});
	});

	describe("TebakKimia", () => {
		it("tebakkimia", async () => {
			const result = await tebakkimia();

			expect(result).to.an("object");
			expect(result.unsur).to.a("string");
			expect(result.lambang).to.a("string");
		});

		it("tebakkimia JSON", () => {
			let res = tebakkimiajson;
			expect(res).to.an("array");
			expect(res).to.have.lengthOf.at.least(125);
		});
	});

	describe("Tekateki", () => {
		it("tekateki", async () => {
			const result = await tekateki();
			expect(result).to.an("object");
			expect(result.soal).to.a("string");
			expect(result.jawaban).to.a("string");
		});

		it("tekateki JSON", () => {
			let res = tekatekijson;
			expect(res).to.an("array");
			expect(res).to.have.lengthOf.at.least(200);
		});
	});

	describe("Siapakahaku", () => {
		it("siapakahaku", async () => {
			const result = await siapakahaku();
			expect(result).to.an("object");
			expect(result.index).to.a("number");
			expect(result.soal).to.a("string");
			expect(result.jawaban).to.a("string");
		});

		it("siapakahaku JSON", () => {
			let res = siapakahakujson;
			expect(res).to.an("array");
			expect(res).to.have.lengthOf.at.least(268);
		});
	});

	describe("Susunkata", () => {
		it("susunkata", async () => {
			const result = await susunkata();
			expect(result).to.an("object");
			expect(result.index).to.a("number");
			expect(result.soal).to.a("string");
			expect(result.tipe).to.a("string");
			expect(result.jawaban).to.a("string");
		});

		it("susunkata JSON", () => {
			let res = susunkatajson;
			expect(res).to.an("array");
			expect(res).to.have.lengthOf.at.least(353);
		});
	});

	describe("Tebakbendera", () => {
		it("tebakbendera", async () => {
			const result = await tebakbendera();

			expect(result).to.an("object");
			expect(result.flag).to.a("string");
			expect(result.img).to.a("string");
			expect(result.name).to.a("string");
		});

		it("tebakbendera JSON", () => {
			let res = tebakbenderajson;
			expect(res).to.an("array");
			expect(res).to.have.lengthOf.at.least(246);
		});
	});

	describe("Tebak Kabupaten", () => {
		it("tebakkabupaten", async () => {
			const result = await tebakkabupaten();
			expect(result).to.an("object");
			expect(result.index).to.a("number");
			expect(result.title).to.a("string");
			expect(result.url).to.a("string");
		});

		it("tebakkabupaten JSON", () => {
			let res = tebakkabupatenjson;
			expect(res).to.an("array");
			expect(res).to.have.lengthOf.at.least(514);
		});
	});

	describe("Tebak Lirik", () => {
		it("tebaklirik", async () => {
			const result = await tebaklirik();
			expect(result).to.an("object");
			expect(result.soal).to.a("string");
			expect(result.jawaban).to.a("string");
		});

		it("tebaklirik JSON", () => {
			let res = tebaklirikjson;
			expect(res).to.an("array");
			expect(res).to.have.lengthOf.at.least(38);
		});
	});

	describe("Tebak Tebakan", () => {
		it("tebaktebakan", async () => {
			const result = await tebaktebakan();
			expect(result).to.an("object");
			expect(result.soal).to.a("string");
			expect(result.jawaban).to.a("string");
		});

		it("tebaktebakan JSON", () => {
			let res = tebaktebakanjson;
			expect(res).to.an("array");
			expect(res).to.have.lengthOf.at.least(199);
		});
	});
});
