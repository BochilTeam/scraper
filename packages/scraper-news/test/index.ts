import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
    cnbcindonesia,
    antaranews,
    kompas,
    suaracom,
    liputan6,
    merdeka
} from '../index.js'

describe('News', () => {
    it('CNBC Indonesia', async () => {
        const data = await cnbcindonesia()
        assert.ok(data)
    })
    it('Antara News', async () => {
        const data = await antaranews()
        assert.ok(data)
    })
    it('Kompas', async () => {
        const data = await kompas()
        assert.ok(data)
    })
    it('Suara.com', async () => {
        const data = await suaracom()
        assert.ok(data)
    })
    it('Liputan6', async () => {
        const data = await liputan6()
        assert.ok(data)
    })

    it('Merdeka', async () => {
        const data = await merdeka()
        assert.ok(data)
    })
})