import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
    gempa,
    gempaNow,
    gempaRealtime,
    tsunami
} from '../index.js'

describe('BMKG', () => {
    describe('Gempabumi', () => {
        it('Gempa dirasakan', async () => {
            const data = await gempa()
            assert.ok(data.length > 1)
        })

        it('Gempabumi Terkini (M ≥ 5.0)', async () => {
            const data = await gempaNow()
            assert.ok(data.length > 1)
        })

        it('Gempabumi realtime', async () => {
            const data = await gempaRealtime()
            assert.ok(data.length > 1)
        })
    })

    it('Tsunami', async () => {
        const data = await tsunami()
        assert.ok(data.length > 1)
    })
})