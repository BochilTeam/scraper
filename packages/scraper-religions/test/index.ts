import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
  asmaulhusna, asmaulhusnajson,
  alquran,
  jadwalsholat, listJadwalSholat
} from '../index.js'

describe('Religions', () => {
  describe('Asmaul Husna', () => {
    it('AsmaulHusna', async () => {
      const data = await asmaulhusna(6)
      assert.strictEqual(data.latin, 'Al Muhaimin')
      assert.strictEqual(data.arabic, 'الْمُهَيْمِنُ')
      assert.strictEqual(data.translation_id, 'Yang Memiliki Mutlak sifat Pemelihara')
      assert.strictEqual(data.translation_en, 'The Guardian, the Preserver')
    })

    it('AsmaulHusna JSON', () => {
      const data = asmaulhusnajson
      assert.ok(data.length === 99)
    })
  })

  describe('Al quran', () => {
    it('Alquran', async () => {
      const data = await alquran()
      assert.ok(data.length === 114)
    })
  })

  describe('Jadwal Sholat', () => {
    it('jadwalSholat', async () => {
      const data = await jadwalsholat('Semarang')
      assert.strictEqual(data.location, '6°58\' LS 110°29\' BT')
      assert.strictEqual(data.direction, '294.48 °')
      assert.strictEqual(data.distance, '8323.049 km')
      assert.ok(data.schedules.length > 27)
    })

    it('List jadwal sholat', async () => {
      const data = await listJadwalSholat
      assert.ok(data.length >= 316)
    })
  })
})
