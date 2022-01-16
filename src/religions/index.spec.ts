import { expect } from "chai";
import {
	alquran,
	asmaulhusna,
	asmaulhusnajson,
	jadwalsholat,
	listJadwalSholat,
} from ".";

describe("Religions", () => {
	describe("Asmaul Husna", () => {
		it("AsmaulHusna", async () => {
			const res = await asmaulhusna();

			expect(res).to.be.an("object");
			expect(res.index).to.be.a("number");
			expect(res.latin).to.be.a("string");
			expect(res.arabic).to.be.a("string");
			expect(res.translation_id).to.be.a("string");
			expect(res.translation_en).to.be.a("string");
		});

		it("AsmaulHusna JSON", () => {
			const res = asmaulhusnajson;
			expect(res).to.be.an("array");
			expect(res).to.have.length(99);
		});
	});

	describe("Al quran", () => {
		it("Alquran", async () => {
			const res = await alquran();

			expect(res).to.have.length(114);
		});
	});

	describe("Jadwal Sholat", () => {
		it("jadwalSholat", async () => {
			const res = await jadwalsholat("Semarang");

			expect(res).to.be.an("object");
			expect(res.today).to.be.an("object");
			expect(res.list).to.be.an("array");
			expect(res.list).to.have.lengthOf.at.least(28);
		});

		it("List jadwal sholat", () => {
			const res = listJadwalSholat;
			expect(res).to.be.an("array");
			expect(res).to.have.lengthOf.at.least(316);
		});
	});
});
