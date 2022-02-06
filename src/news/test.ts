import { expect } from "chai";
import {
    cnbindonesia,
    antaranews,
    kompas
} from "./index"

describe('News', () => {
    it('CNB indonesia', (done) => {
        cnbindonesia().then(data => {
            expect(data).to.be.an('array');
            expect(data).to.have.length.at.least(1)
            data.forEach(({
                title,
                link,
                image,
                label,
                date,
            }) => {
                expect(title).to.be.a('string');
                expect(link).to.be.a('string');
                expect(image).to.be.a('string');
                expect(label).to.be.a('string');
                expect(date).to.be.a('string');
            })

            return done()
        }).catch(done)
    })

    it('antaranews', (done) => {
        antaranews().then(data => {
            expect(data).to.be.an('array');
            expect(data).to.have.length.at.least(1)
            data.forEach(({
                title,
                link,
                image,
                label,
                date,
            }) => {
                expect(title).to.be.a('string');
                expect(link).to.be.a('string');
                expect(image).to.be.a('string');
                expect(label).to.be.a('string');
                expect(date).to.be.a('string');
            })

            return done()
        }).catch(done)
    })

    it('kompas', (done) => {
        kompas().then(data => {
            expect(data).to.be.an('array');
            data.forEach(({
                title,
                link,
                image,
                label,
                date,
            }) => {
                expect(title).to.be.a('string');
                expect(link).to.be.a('string');
                expect(image).to.be.a('string');
                expect(label).to.be.a('string');
                expect(date).to.be.a('string');
            })

            return done()
        }).catch(done)
    })
})