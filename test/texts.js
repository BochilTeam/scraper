const { expect } = require('chai')

describe('Texts', () => {
    const { latinToAksara, aksaraToLatin } = require('../lib/texts')
    describe('Aksara Jawa', () => {
        it('Latin to Aksara', done => {
            try {
                const res = latinToAksara('opo')
                expect(res).equal('ꦲꦺꦴꦥꦺꦴ')
                return done()
            } catch(e) {
                return done(e)
            }
        })

        it('Aksara to Latin', done => {
            try {
                const res = aksaraToLatin('ꦲꦺꦴꦥꦺꦴ')
                expect(res).equal('opo')
                return done()
            } catch(e) {
                return done(e)
            }
        })
    })
})