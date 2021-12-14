const expect = require('chai').expect

describe('Social media', () => {
    const { tiktokdl, tiktokfyp, tiktokstalk, instagramdl } = require('../lib/social-media')
    describe('Tiktok scraper', function () {
        it('tiktokdl', function (done) {
            tiktokdl('https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226').then(function (res) {
                expect(res).to.be.an('object')
                expect(res.author).to.be.an('object')
                expect(res.description).to.be.a('string')
                expect(res.video).to.be.an('object')
                expect(res.music).to.be.a('string')

                return done()
            }).catch(done)
        })

        it('tiktokfyp', function (done) {
            tiktokfyp().then(function (res) {
                expect(res).to.be.an('array')
                expect(res.length).to.be.above(0)

                return done()
            }).catch(done)
        })

        it('tiktokstalk', function (done) {
            tiktokstalk('Tiktok').then(function (res) {
                console.log(res)
                expect(res).to.be.an('object')
                expect(res.username).to.be.a('string')
                expect(res.profile).to.be.a('string')
                expect(res.avatar).to.be.a('string')
                expect(res.verified).to.be.a('boolean')
                expect(res.following).to.be.a('string')
                expect(res.followers).to.be.a('string')
                expect(res.likes).to.be.a('string')
                expect(res.description).to.be.a('string')

                return done()
            }).catch(done)
        })
    })

    describe('Instagram', () => {
        it('Instagram Downloader', done => {
            instagramdl('https://www.instagram.com/p/CXTPwOuqziD/?utm_source=ig_web_copy_link').then(res => {
                expect(res).to.be.an('object')
                expect(res.thumbnail).instanceof(Buffer)
                expect(res.result).to.be.a('string')

                return done()
            }).catch(done)
        })
    })
})
