const { expect } = require('chai')

describe('Images', () => {
    const { googleImage, pinterest } = require('../')
    it('google-image', done => {
        googleImage('Minecraft').then(res => {
            expect(res).to.be.a('array')
            res.forEach(v => expect(v).to.be.a('string'))

            return done()
        }).catch(done)
    })

    it('pinterest', done => {
        pinterest('Minecraft').then(res => {
            expect(res).to.be.a('array')
            res.forEach(v => expect(v).to.be.a('string'))

            return done()
        }).catch(done)
    })

    it('wallpaper', done => {
        pinterest('Minecraft').then(res => {
            expect(res).to.be.a('array')
            res.forEach(v => expect(v).to.be.a('string'))

            return done()
        }).catch(done)
    })
})