import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  latinToAksara,
  aksaraToLatin,
  bucin, bucinjson,
  dare, darejson,
  truth, truthjson,
  textpro, textproList
} from '../index.js'

describe('Texts', () => {
  describe('Aksara Jawa', () => {
    it('Latin to Aksara', () => {
      const result = latinToAksara('hallo rek')
      assert.strictEqual(result, 'ꦲꦭ꧀ꦭꦺꦴ​ꦫꦺꦏ꧀')
    })

    it('Aksara to Latin', () => {
      const result = aksaraToLatin('ꦲꦭ꧀ꦭꦺꦴ​ꦫꦺꦏ꧀', { HVokal: false })
      assert.strictEqual(result, 'hal​lo rek​')
    })
  })
  describe('Bucin', () => {
    it('Bucin', async () => {
      const result = await bucin()
      assert.ok(result)
    })
    it('Bucin JSON', () => {
      const result = bucinjson
      assert.ok(Array.isArray(result))
      assert.ok(result.length >= 365)
    })
  })

  describe('Dare', () => {
    it('Dare', async () => {
      const result = await dare()
      assert.ok(result)
    })
    it('Dare JSON', () => {
      const result = darejson
      assert.ok(Array.isArray(result))
      assert.ok(result.length >= 63)
    })
  })

  describe('Truth', () => {
    it('Truth', async () => {
      const result = await truth()
      assert.ok(result)
    })
    it('Truth JSON', () => {
      const result = truthjson
      assert.ok(Array.isArray(result))
      assert.ok(result.length >= 61)
    })
  })

  describe('TextPro', () => {
    it('TextPro', async () => {
      const result = await textpro('neon', ['Hallo'])
      assert.ok(result)
    })

    it('TextPro List', async () => {
      const result = await textproList
      assert.ok(Array.isArray(result))
      assert.ok(result.length > 1)
    })
  })
})
