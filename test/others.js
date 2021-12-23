const { expect } = require('chai')

describe('Others', () => {
    const { statusJava, wikipedia } = require('../lib/others')

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

})