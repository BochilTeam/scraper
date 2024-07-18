import { describe, it } from 'node:test'
import assert from 'node:assert'
import { sfilemobiSearch } from '../index.js'

const SFILEMOBI_QUERY = 'Minecraft'

describe('Sfilemmobi Search', () => {
    it('Search', async () => {
        const results = await sfilemobiSearch(SFILEMOBI_QUERY)
        assert.ok(results.length > 0)
    })
})