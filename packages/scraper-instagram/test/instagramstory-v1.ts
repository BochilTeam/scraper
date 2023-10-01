import { instagramStory } from '../index.js'
import { test } from 'node:test'
import assert from 'node:assert'
import got from 'got'
import { InstagramStory } from '../types/instagramstory-v1.js'

const USERNAME = 'raffinagita1717'

test('Instagram Story Downloader', async (t) => {
    let stories: InstagramStory
    await t.test('Getting Metadata', async () => {
        stories = await instagramStory(USERNAME)
        assert.strictEqual(stories.length > 0, true)
    })

    await t.test('Download Story', async () => {
        if (!stories.length)
            return t.skip('Test skipped -- error in getting metadata!')
        const [{ url }] = stories
        const buffer = await got(url).buffer()
        assert.strictEqual(buffer.byteLength > 0, true)
    })

    await t.test('Download Story Thumbnail', async () => {
        if (!stories.length)
            return t.skip('Test skipped -- error in getting metadata!')
        const [{ thumbnail }] = stories
        const buffer = await got(thumbnail).buffer()
        assert.strictEqual(buffer.byteLength > 0, true)
    })

})