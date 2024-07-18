import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
    artinama,
    artimimpi,
    nomorhoki,
    getZodiac
} from '../index.js'

describe('Primbon', () => {
    it('Arti nama', async () => {
        const data = await artinama('Windah Basudara')
        assert.ok(data.length > 0)
    })
    it('Arti mimpi', async () => {
        const data = await artimimpi('Jalan')
        assert.ok(data.length > 0)
    })
    it('Nomor hoki', async () => {
        const data = await nomorhoki(6213353)
        assert.ok(data)
    })
    it('Zodiac', () => {
        const res = getZodiac(1, 1)
        assert.strictEqual(res, 'capricorn')
    })
})