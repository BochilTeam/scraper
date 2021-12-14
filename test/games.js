const { expect } = require('chai')

describe('Games', () => {
    const { tebakgambar, caklontong, asahotak, family100, tebakkata, tebakkimia, tekateki } = require('../')
    describe('Tebakgambar', () => {
        it('tebakgambar', done => {
            tebakgambar().then(result => {
                expect(result).to.an('object')
                expect(result.index).to.a('number')
                expect(result.img).to.a('string')
                expect(result.jawaban).to.a('string')
                expect(result.deskripsi).to.a('string')

                return done()
            }).catch(done)
        })

        it('tebakgambar JSON', done => {
            let res = require('../').tebakgambarjson
            expect(res).to.an('array')
            expect(res).to.have.lengthOf.at.least(1000)

            return done()
        })
    })

    describe('Asahotak', () => {
        it('asahotak', done => {
            asahotak().then(result => {
                expect(result).to.an('object')
                expect(result.index).to.a('number')
                expect(result.soal).to.a('string')
                expect(result.jawaban).to.a('string')

                return done()
            }).catch(done)
        })

        it('asahotak JSON', done => {
            let res = require('../').asahotakjson
            expect(res).to.an('array')
            expect(res).to.have.lengthOf.at.least(228)

            return done()
        })
    })

    describe('Caklontong', () => {
        it('caklontong', done => {
            caklontong().then(result => {
                expect(result).to.an('object')
                expect(result.index).to.a('number')
                expect(result.soal).to.a('string')
                expect(result.jawaban).to.a('string')
                expect(result.deskripsi).to.a('string')

                return done()
            }).catch(done)
        })

        it('caklontong JSON', done => {
            let res = require('../').caklontongjson
            expect(res).to.an('array')
            expect(res).to.have.lengthOf.at.least(414)

            return done()
        })
    })

    describe('Family 100', () => {
        it('family100', done => {
            family100().then(result => {
                expect(result).to.an('object')
                expect(result.soal).to.a('string')
                expect(result.jawaban).to.a('array')

                return done()
            }).catch(done)
        })

        it('family100 JSON', done => {
            let res = require('../').family100json
            expect(res).to.an('array')
            expect(res).to.have.lengthOf.at.least(7152)

            return done()
        })
    })

    describe('TebakKata', () => {
        it('tebakkata', done => {
            tebakkata().then(result => {
                expect(result).to.an('object')
                expect(result.index).to.a('number')
                expect(result.soal).to.a('string')
                expect(result.jawaban).to.a('string')

                return done()
            }).catch(done)
        })

        it('tebakkata JSON', done => {
            let res = require('../').tebakkatajson
            expect(res).to.an('array')
            expect(res).to.have.lengthOf.at.least(302)

            return done()
        })
    })

    describe('TebakKimia', () => {
        it('tebakkimia', done => {
            tebakkimia().then(result => {
                expect(result).to.an('object')
                expect(result.unsur).to.a('string')
                expect(result.lambang).to.a('string')

                return done()
            }).catch(done)
        })

        it('tebakkimia JSON', done => {
            let res = require('../').tebakkimiajson
            expect(res).to.an('array')
            expect(res).to.have.lengthOf.at.least(125)

            return done()
        })
    })

    describe('Tekateki', () => {
        it('tekateki', done => {
            tekateki().then(result => {
                expect(result).to.an('object')
                expect(result.soal).to.a('string')
                expect(result.jawaban).to.a('string')

                return done()
            }).catch(done)
        })

        it('tekateki JSON', done => {
            let res = require('../').tekatekijson
            expect(res).to.an('array')
            expect(res).to.have.lengthOf.at.least(200)

            return done()
        })
    })
})