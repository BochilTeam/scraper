import { expect } from "chai";
import {
	aksaraToLatin,
	bucin,
	bucinjson,
	dare,
	darejson,
	latinToAksara,
	truth,
	truthjson,
} from ".";

describe("Texts", () => {
	describe("Aksara Jawa", () => {
		it("Latin to Aksara", () => {
			const res = latinToAksara("hallo rek");
			expect(res).equal("ꦲꦭ꧀ꦭꦺꦴ​ꦫꦺꦏ꧀");
		});

		it("Aksara to Latin", () => {
			const res = aksaraToLatin("ꦲꦭ꧀ꦭꦺꦴ​ꦫꦺꦏ꧀", { HVokal: false });
			expect(res).equal("hal​lo rek​");
		});
	});
	describe("Bucin", () => {
		it("Bucin", async () => {
			const res = await bucin();

			expect(res).to.be.a("string");
		});
		it("Bucin JSON", () => {
			const res = bucinjson;
			expect(res).to.be.an("array");
			expect(res).to.have.lengthOf.at.least(365);
		});
	});

	describe("Dare", () => {
		it("Dare", async () => {
			const res = await dare();

			expect(res).to.be.a("string");
		});
		it("Dare JSON", () => {
			const res = darejson;
			expect(res).to.be.an("array");
			expect(res).to.have.lengthOf.at.least(63);
		});
	});

	describe("Truth", () => {
		it("Truth", async () => {
			const res = await truth();

			expect(res).to.be.a("string");
		});
		it("Truth JSON", () => {
			const res = truthjson;
			expect(res).to.be.an("array");
			expect(res).to.have.lengthOf.at.least(61);
		});
	});
});
