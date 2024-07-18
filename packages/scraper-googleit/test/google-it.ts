import { it } from 'node:test'
import assert from 'node:assert'
import { googleit } from '../index.js'

const QUERY = 'Minecraft'

it('Google It', async () => {
    const result = await googleit(QUERY)
    assert.ok(result.articles.length > 1)
})