import { describe, it } from 'node:test'
import assert from 'node:assert'
import got from 'got'
import { twitter } from '../index.js'

const TWITTER_URL = 'https://twitter.com/jen_degen/status/1458167531869458440?s=20'

describe('Twitter Downloader', async () => {  
    it('Getting Metadata', async () => {
        const result = await twitter(TWITTER_URL)
      
    })
})