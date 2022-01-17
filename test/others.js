const { expect } = require('chai')

describe('Others', () => {
    const {
        // statusJava, 
        wikipedia,
        jadwalTV,
        jadwalTVNow
    } = require('../lib/others')

    // TODO
    // describe('Minecraft', () => {
    //     it('Minecraft java', done => {
    //         statusJava('').then(res => {
    //             return done()
    //         }).catch(done)
    //     })
    // })

    it('Wikipedia', (done) => {
        wikipedia('Minecraft', 'en').then(res => {
            expect(res).to.be.an('object')
            expect(res.title).to.be.a('string')
            expect(res.img).to.be.a('string')
            expect(res.articles).to.be.a('string')

            return done()
        }).catch(done)
    })
    describe('Jadwal TV', () => {
        it('Jadwal TV', done => {
            jadwalTV('RCTI').then(res => {
                expect(res).to.be.an('object')
                expect(res.channel).to.be.a('string')
                expect(res.result).to.be.an('array')
                expect(res.result).to.have.lengthOf.at.least(1)

                return done()
            }).catch(done)
        })

        it('Jadwal TV NOW', done => {
            jadwalTVNow().then(res => {
                expect(res).to.be.an('object')
                Object.keys(res).forEach(key => {
                    expect(key).to.be.a('string')
                    expect(res[key]).to.be.an('array')
                    expect(res[key]).to.have.lengthOf.at.least(2)
                })

                return done()
            }).catch(done)
        })
    })
})