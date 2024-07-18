import { youtubeSearch } from '../index.js'
import { describe, it } from 'node:test'
import assert from 'node:assert'

const QUERY = 'Minecraft'

describe('Youtube Search', async () => {
    const results = await youtubeSearch(QUERY)
    assert.ok(results.video.length > 0)
    assert.ok(results.channel.length > 0)
})