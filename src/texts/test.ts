import { expect } from 'chai'
import {
  latinToAksara,
  aksaraToLatin,
  bucin, bucinjson,
  dare, darejson,
  truth, truthjson
} from './index'
describe('Texts', () => {
  describe('Aksara Jawa', () => {
    it('Latin to Aksara', done => {
      try {
        const res = latinToAksara('hallo rek')
        expect(res).equal('ꦲꦭ꧀ꦭꦺꦴ​ꦫꦺꦏ꧀')

        return done()
      } catch (e) {
        return done(e)
      }
    })

    it('Aksara to Latin', done => {
      try {
        const res = aksaraToLatin('ꦲꦭ꧀ꦭꦺꦴ​ꦫꦺꦏ꧀', { HVokal: false })
        expect(res).equal('hal​lo rek​')

        return done()
      } catch (e) {
        return done(e)
      }
    })
  })
  describe('Bucin', () => {
    it('Bucin', done => {
      bucin().then(res => {
        expect(res).to.be.a('string')

        return done()
      }).catch(done)
    })
    it('Bucin JSON', done => {
      const res = bucinjson
      expect(res).to.be.an('array')
      expect(res).to.have.lengthOf.at.least(365)

      return done()
    })
  })

  describe('Dare', () => {
    it('Dare', done => {
      dare().then(res => {
        expect(res).to.be.a('string')

        return done()
      }).catch(done)
    })
    it('Dare JSON', done => {
      const res = darejson
      expect(res).to.be.an('array')
      expect(res).to.have.lengthOf.at.least(63)

      return done()
    })
  })

  describe('Truth', () => {
    it('Truth', done => {
      truth().then(res => {
        expect(res).to.be.a('string')

        return done()
      }).catch(done)
    })
    it('Truth JSON', done => {
      const res = truthjson
      expect(res).to.be.an('array')
      expect(res).to.have.lengthOf.at.least(61)

      return done()
    })
  })
})
