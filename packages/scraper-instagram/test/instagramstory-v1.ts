import { describe, it } from 'node:test'
import assert from 'node:assert'
import { instagramStory } from '../index.js'
import got from 'got'
import { InstagramStory } from '../types/instagramstory-v1.js'

const USERNAME = 'raffinagita1717'

describe('Instagram Story Downloader', async (t) => {
    let stories: InstagramStory
    it('Getting Metadata', async () => {
        stories = await instagramStory(USERNAME)
        assert.strictEqual(stories.length > 0, true)
    })

    it('Download Story', async (t) => {
            if (!stories?.length)
                return t.skip('Test skipped -- error in getting metadata!')
            const [{ url }] = stories
            const buffer = await got(url).buffer()
            assert.ok(buffer.byteLength > 0)
        })

    it('Download Story Thumbnail', async (t) => {
        if (!stories?.length)
            return t.skip('Test skipped -- error in getting metadata!')
        const [{ thumbnail }] = stories
        const buffer = await got(thumbnail).buffer()
        assert.ok(buffer.byteLength > 0)
    })

})