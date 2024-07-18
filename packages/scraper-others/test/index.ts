import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  jadwalTV,
  jadwalTVNow,
  listJadwalTV,
  kbbi,
  nameFreeFire,
  bioskopNow,
  bioskop,
  chord,
} from '../index.js'

describe('Others', () => {
  describe('Jadwal TV', () => {
    it('Jadwal TV', async () => {
      const result = await jadwalTV('RCTI')
      assert.ok(result.result.length > 1)
    })

    it('Jadwal TV NOW', async () => {
      const result = await jadwalTVNow()
      Object.entries(result).forEach(([key, data]) => {
        assert.ok(data.length > 1)
      })
    })

    it('List Jadwal TV', async () => {
      const result = await listJadwalTV
      assert.ok(result.length >= 123)
    })
  })

  it('KBBI', async () => {
    const data = await kbbi('halo')
    assert.ok(data)
  })

  it('ID Free Fire', async () => {
    const data = await nameFreeFire('821587717')
    assert.ok(data)
  })

  describe('Bioskop', () => {
    it('Bioskop now', async () => {
      const result = await bioskopNow()
      assert.ok(result.length > 1)
    })

    it('Bioskop', async () => {
      const result = await bioskop()
      assert.ok(result.length > 1)
    })
  })

  describe('Chord', function () {
    it('Chord', async () => {
      const result = await chord('Until i found you')
      assert.ok(result)
    })
  })
})

