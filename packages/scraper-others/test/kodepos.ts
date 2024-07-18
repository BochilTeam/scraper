import { it } from 'node:test'
import { kodepos } from '../index.js'
import assert from 'node:assert'

it('KodePos', async () => {
    const result = await kodepos('Samboja')
    assert.ok(result.length > 1)
})