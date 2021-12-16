const { expect } = require('chai')

describe('Images', () => {
    const { googleImage, pinterest, wallpaper, stickerLine, stickerTelegram } = require('../')
    it('google-image', done => {
        googleImage('Minecraft').then(res => {
            expect(res).to.be.an('array')
            res.forEach(v => expect(v).to.be.a('string'))

            return done()
        }).catch(done)
    })

    it('pinterest', done => {
        pinterest('Minecraft').then(res => {
            expect(res).to.be.an('array')
            res.forEach(v => expect(v).to.be.a('string'))

            return done()
        }).catch(done)
    })

    it('wallpaper', done => {
        wallpaper('Minecraft').then(res => {
            expect(res).to.be.an('array')
            res.forEach(v => expect(v).to.be.a('string'))

            return done()
        }).catch(done)
    })

    it('Sticker Telegram', done => {
        stickerTelegram('Minecraft').then(res => {
            expect(res).to.be.an('array')
            res.forEach(v => expect(v).to.be.an('object'))

            return done()
        }).catch(done)
    })

    it('Sticker Line', done => {
        stickerLine('Anime').then(res => {
            expect(res).to.be.an('array')
            res.forEach(v => expect(v).to.be.an('object'))
            return done()
        }).catch(done)
    })
})