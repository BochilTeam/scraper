import { describe, it } from 'node:test'
import assert from 'node:assert'
import { lyrics, lyricsv2 } from '../index.js'

const QUERY = 'Bohemian Rhapsody'
// const QUERY = 'Risalah Hati Dewa19' 

describe('Lyrics', () => {
    it('Lyrics V1', async () => {
        const result = await lyrics(QUERY)
        assert.strictEqual(result.title, 'Bohemian Rhapsody')
        assert.strictEqual(result.artist, 'Queen')
        assert.strictEqual(result.album, 'Stone Cold Classics')
        assert.ok(result.lyrics.length > 10)
    })

    it('Lyrics V2', async () => {
        const result = await lyricsv2(QUERY)
        // assert.strictEqual(result.title, 'Bohemian Rhapsody by Queen')
        assert.strictEqual(result.artist, 'Queen')
        assert.strictEqual(result.album, 'A Night at the Opera')
        assert.ok(result.lyrics.length > 10)
    })
})