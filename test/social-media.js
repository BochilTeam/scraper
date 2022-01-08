const expect = require('chai').expect

describe('Social media', () => {
    const { tiktokdl, tiktokdlv2, tiktokfyp, tiktokstalk, instagramdl, instagramStory, facebookdl, twitterdl, instagramdlv2, twitterdlv2, facebookdlv2 } = require('../lib/social-media')
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
        it('tiktokdl v2', function (done) {
            tiktokdlv2('https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226').then(function (res) {
                expect(res).to.be.an('object')
                expect(res.author).to.be.an('object')
                expect(res.video).to.be.an('object')

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

        // it('tiktokstalk', function (done) {
        //     tiktokstalk('Tiktok').then(function (res) {
        //         expect(res).to.be.an('object')
        //         // expect(res.username).to.be.a('string')
        //         // expect(res.profile).to.be.a('string')
        //         // expect(res.avatar).to.be.a('string')
        //         // expect(res.verified).to.be.a('boolean')   Github action error!
        //         // expect(res.following).to.be.a('string')
        //         // expect(res.followers).to.be.a('string')
        //         // expect(res.likes).to.be.a('string')
        //         // expect(res.description).to.be.a('string')

        //         return done()
        //     }).catch(done)
        // })
    })

    describe('Instagram', () => {
        it('Instagram Downloader', done => {
            instagramdl('https://www.instagram.com/reel/CXK49yFLtJ_/?utm_source=ig_web_copy_link').then(res => {
                expect(res).to.be.an('array')
                expect(res).to.have.lengthOf.at.least(1)
                res.forEach(({ thumbnail, url }) => {
                    expect(thumbnail).instanceof(Buffer)
                    expect(url).to.be.a('string')
                })

                return done()
            }).catch(done)
        })

        it('Instagram Downloader V2', done => {
            instagramdlv2('https://www.instagram.com/reel/CXK49yFLtJ_/?utm_source=ig_web_copy_link').then(res => {
                expect(res).to.be.an('array')
                expect(res).to.have.lengthOf.at.least(1)
                res.forEach(({ thumbnail, url }) => {
                    expect(thumbnail).to.be.a('string')
                    expect(url).to.be.a('string')
                })

                return done()
            }).catch(done)
        })

        // it('Instagram Story', function (done) {
        //     instagramStory('freefirebgid').then(res => {
        //         expect(res).to.be.an('array')
        //         res.forEach(({ thumbnail, isVideo, url }) => {
        //             expect(thumbnail).to.be.a('string')
        //             expect(isVideo).to.be.a('boolean')  
        //             expect(url).to.be.a('string')
        //         })

        //         return done()
        //     }).catch(done)
        // })
    })

    describe('Facebook (Metaverse :V)', function () {
        this.timeout(3e4)
        it('Facebook Downloader', done => {
            facebookdl('https://fb.watch/9WktuN9j-z/').then(res => {
                expect(res).to.be.an('object')
                expect(res.id).to.be.a('string')
                expect(res.thumbnail).to.be.a('string')
                expect(res.duration).to.be.a('number')
                expect(res.result).to.be.an('array')
                res.result.forEach(({ ext, url, isVideo, isAudio }) => {
                    expect(ext).to.be.a('string')
                    expect(url).to.be.a('string')
                    expect(isVideo).to.be.a('boolean')
                    expect(isAudio).to.be.a('boolean')
                })

                return done()
            }).catch(done)
        })

        it('Facebook Downloader V2', done => {
            facebookdlv2('https://fb.watch/9WktuN9j-z/').then(res => {
                expect(res).to.be.an('object')
                expect(res.id).to.be.a('string')
                expect(res.thumbnail).to.be.a('string')
                expect(res.result).to.be.an('array')
                res.result.forEach(({ quality, url }) => {
                    expect(quality).to.be.a('string')
                    expect(url).to.be.a('string')
                })

                return done()
            }).catch(done)
        })
    })

    describe('Twitter', () => {
        it('Twitter Downloader', done => {
            twitterdl('https://twitter.com/jen_degen/status/1458167531869458440?s=20').then(res => {
                expect(res).to.be.an('array')
                res.forEach(({ quality, type, url, isVideo }) => {
                    expect(quality).to.be.a('string')
                    expect(type).to.be.a('string')
                    expect(url).to.be.a('string')
                    expect(isVideo).to.be.a('boolean')
                })

                return done()
            }).catch(done)
        })

        it('Twitter Downloader V2', done => {
            twitterdlv2('https://twitter.com/jen_degen/status/1458167531869458440?s=20').then(res => {
                expect(res).to.be.an('array')
                res.forEach(({ quality, type, url }) => {
                    expect(quality).to.be.a('string')
                    expect(type).to.be.a('string')
                    expect(url).to.be.a('string')
                })

                return done()
            }).catch(done)
        })
    })
})
