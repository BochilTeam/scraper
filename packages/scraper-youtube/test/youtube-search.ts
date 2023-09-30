import { youtubeSearch } from '../index.js'
import { test } from 'node:test'
import assert from 'node:assert'

const QUERY = 'Minecraft'

test('Youtube Search', async () => {
    const results = await youtubeSearch(QUERY)
    assert.strictEqual(results.video.length > 0, true)
    assert.strictEqual(results.channel.length > 0, true)
})