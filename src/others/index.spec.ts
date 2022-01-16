import { expect } from "chai";
import { wikipedia } from ".";

describe("Others", () => {
	// TODO
	// describe('Minecraft', () => {
	//     it('Minecraft java', done => {
	//         statusJava('').then(res => {
	//             return done()
	//         }).catch(done)
	//     })
	// })

	it("Wikipedia", async () => {
		const result = await wikipedia("Minecraft", "en");
		expect(result).to.be.an("object");
		expect(result.title).to.be.a("string");
		expect(result.img).to.be.a("string");
		expect(result.articles).to.be.a("string");
	});
});
