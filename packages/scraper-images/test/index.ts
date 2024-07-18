import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
    googleImage,
    pinterest,
    wallpaper,
    stickerLine,
    stickerTelegram
} from '../index.js'

describe('Images', () => {
    it('Google Image', async function() {
        const data = await googleImage('Minecraft')
        assert.ok(data)
    })

    it('Pinterest', async () => {
        const data = await pinterest('Minecraft')
        assert.ok(data)
    })

   it('Wallpaper', async () => {
        const data = await wallpaper('Minecraft')
        assert.ok(data)
    })

    it('sticker Telegram', async () => {
        const data = await stickerTelegram('Minecraft')
        assert.ok(data)
    })

    it('Sticker Line', async () => {
        const data = await stickerLine('Anime')
        assert.ok(data)
    })
})
