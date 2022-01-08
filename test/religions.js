const { expect } = require('chai')

describe('Religions', () => {
    const { asmaulhusna, alquran } = require('../lib/religions')
    describe('Asmaul Husna', () => {
        it('AsmaulHusna', done => {
            asmaulhusna().then(res => {
                expect(res).to.be.an('object')
                expect(res.index).to.be.a('number')
                expect(res.latin).to.be.a('string')
                expect(res.arabic).to.be.a('string')
                expect(res.translation_id).to.be.a('string')
                expect(res.translation_en).to.be.a('string')

                return done()
            }).catch(done)
        })

        it('AsmaulHusna JSON', done => {
            const res = require('../lib/religions').asmaulhusnajson
            expect(res).to.be.an('array')
            expect(res).to.have.length('99')

            return done()
        })
    })

    describe('Al quran', () => {
        it('Alquran', done => {
            alquran().then(res => {
                expect(res).to.have.length('114')

                return done()
            }).catch(done)
        })
    })
})