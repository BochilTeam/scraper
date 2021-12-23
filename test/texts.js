const { expect } = require('chai')

describe('Texts', () => {
    const { latinToAksara, aksaraToLatin } = require('../lib/texts')
    describe('Aksara Jawa', () => {
        it('Latin to Aksara', done => {
            try {
                const res = latinToAksara('hallo rek')
                expect(res).equal('ꦲꦭ꧀ꦭꦺꦴ​ꦫꦺꦏ꧀')

                return done()
            } catch(e) {
                return done(e)
            }
        })

        it('Aksara to Latin', done => {
            try {
                const res = aksaraToLatin('ꦲꦭ꧀ꦭꦺꦴ​ꦫꦺꦏ꧀', { HVokal: false })
                expect(res).equal('hal​lo rek​')

                return done()
            } catch(e) {
                return done(e)
            }
        })
    })
})