import { expect } from "chai";
import { artimimpi, artinama, getZodiac, nomorhoki } from ".";

describe("Primbon", () => {
	it("ArtiMimpi", async () => {
		const res = await artimimpi("Jalan");

		expect(res).to.be.an("array");
		res.forEach((v) => expect(v).to.be.a("string"));
	});

	it("ArtiNama", async () => {
		const res = await artinama("Windah basudara");
		expect(res).to.be.a("string");
	});

	it("NomorHoki", async () => {
		const res = await nomorhoki(6213353);

		expect(res).to.be.an("Object");
		expect(res).to.haveOwnProperty("nomer");
		expect(res.angka_bagua_shuzi).to.be.a("number");
		expect(res.positif.kekayaan).to.be.a("number");
		expect(res.positif.kesehatan).to.be.a("number");
		expect(res.positif.cinta).to.be.a("number");
		expect(res.positif.kestabilan).to.be.a("number");
		expect(res.positif.positif).to.be.a("number");
		expect(res.negatif.perselisihan).to.be.a("number");
		expect(res.negatif.kehilangan).to.be.a("number");
		expect(res.negatif.malapetaka).to.be.a("number");
		expect(res.negatif.Kehancuran).to.be.a("number");
		expect(res.negatif.negatif).to.be.a("number");
	});

	it("Zodiac", () => {
		const res = getZodiac(1, 1);
		expect(res).equal("capricorn");
	});
});
