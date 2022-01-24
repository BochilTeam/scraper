import { expect } from 'chai'
import {
    wikipedia,
    jadwalTV,
    jadwalTVNow, listJadwalTV,
    mediafiredl,
    gempa, gempaNow,
    tsunami
} from './index'

describe('Others', () => {

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

    describe('Mediafire', () => {
        it('Mediafire Download', done => {
            mediafiredl('https://www.mediafire.com/file/gpeiucmm1xo6ln0/hello_world.mp4/file').then(res => {
                expect(res).to.be.an('object')
                expect(res.url).to.be.a('string')
                expect(res.url2).to.be.a('string')
                expect(res.filename).to.be.a('string')
                expect(res.aploud).to.be.a('string')
                expect(res.filesizeH).to.be.a('string')
                expect(res.filesize).to.be.a('number')

                return done()
            }).catch(done)
        })
    })

    describe('Gempa', () => {
        it('Gempa', done => {
            gempa().then(res => {
                expect(res).to.be.an('array')
                res.forEach(({
                    date,
                    locate,
                    magnitude,
                    depth,
                    location,
                    warning
                }) => {
                    expect(date).to.be.a('string')
                    expect(locate).to.be.a('string')
                    expect(magnitude).to.be.a('string')
                    expect(depth).to.be.a('string')
                    expect(location).to.be.a('string')
                    expect(warning).to.be.an('array')
                    warning.forEach(s => expect(s).to.be.a('string'))

                })

                return done()
            }).catch(done)
        })

        it('Gempa Now', done => {
            gempaNow().then(res => {
                expect(res).to.be.an('array')
                res.forEach(({
                    date,
                    latitude,
                    longitude,
                    magnitude,
                    depth,
                    location,
                }) => {
                    expect(date).to.be.a('string')
                    expect(latitude).to.be.a('string')
                    expect(longitude).to.be.a('string')
                    expect(magnitude).to.be.a('string')
                    expect(depth).to.be.a('string')
                    expect(location).to.be.a('string')

                })

                return done()
            }).catch(done)
        })
    })

    it('Tsunami', (done) => {
        tsunami().then(res => {
            expect(res).to.be.an('array')
            res.forEach(({
                date,
                locate,
                magnitude,
                depth,
                location,
            }) => {
                expect(date).to.be.a('string')
                expect(locate).to.be.a('string')
                expect(magnitude).to.be.a('string')
                expect(depth).to.be.a('string')
                expect(location).to.be.a('string')

            })

            return done()
        }).catch(done)
    })
})