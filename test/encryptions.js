const { expect } = require('chai')

describe('Encryptions', () => {
    const { toBase64, fromBase64ToString, randomUUID, randomBytes, createHash } = require('../lib/encryptions')
    describe('Base64', () => {
        it('From string to base64', done => {
            try {
                const res = toBase64('Hello World!!')
                expect(res).to.be.a('string')
                expect(res).to.be.equal('SGVsbG8gV29ybGQhIQ==')

                return done()
            } catch (e) {
                return done(e)
            }
        })

        it('from base64 to string', done => {
            try {
                const res = fromBase64ToString('SGVsbG8gV29ybGQhIQ==')
                expect(res).to.be.a('string')
                expect(res).to.be.equal('Hello World!!')

                return done()
            } catch (e) {
                return done(e)
            }
        })
    })

    describe('Crypto', () => {
        it('randomUUID', done => {
            try {
                const res = randomUUID()
                if (res instanceof Promise) res.then(res => (expect(res).to.be.a('string'), done()))
                else (expect(res).to.be.a('string'), done())
            } catch (e) {
                return done(e)
            }
        })

        it('randomBytes', done => {
            try {
                const res = randomBytes(16)
                expect(res).to.be.a('string')

                return done()
            } catch (e) {
                return done(e)
            }
        })

        it('createHash', done => {
            try {
                const res = createHash('sha256', 'Hello world!!')
                expect(res).to.be.a('string')
                expect(res).to.have.length(64)

                return done()
            } catch (e) {
                return done(e)
            }
        })
    })
})