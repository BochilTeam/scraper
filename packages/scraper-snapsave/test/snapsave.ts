import { describe, it } from 'node:test'
import assert from 'node:assert'
import got from 'got'
import { snapsave } from '../index.js'

const TIKTOK_URL = 'https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226'
const FB_URL = 'https://fb.watch/9WktuN9j-z/'
// const IG_URL = 'https://instagram.com/stories/officialpersebaya/2787913152184277704?utm_source=ig_story_item_share&utm_medium=share_sheet'
const IG_URL = 'https://www.instagram.com/p/C9W-HXGJr0E/?igsh=MW52dXY0dndpMGh0eg=='

describe('SnapSave', async () => {
  it('Tiktok Downloader', async () => {
    const result = await snapsave(TIKTOK_URL)
  })

  it('Facebook Downloader', async () => {
    const result = await snapsave(FB_URL)
  })

  it('Instagram Downloader', async () => {
    const result = await snapsave(IG_URL)
  })
})