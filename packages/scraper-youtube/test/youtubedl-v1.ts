import { youtubedl } from '../index.js'
import { test } from 'node:test'
import assert from 'node:assert'
import { Youtubedl } from '../types/index.js'
import got from 'got'

const YT_URL = 'https://youtu.be/iik25wqIuFo'

test('Youtube Download V1', async (t) => {

    let data: Youtubedl
    await t.test('Getting metadata', async () => {
        data = await youtubedl(YT_URL)
    })

    let videoUrl: string
    await t.test('Getting video download link', async () => {
        if (!data)
            return t.skip('Test skipped -- error in getting metadata!')
        const keys = Object.keys(data.video)
        videoUrl = await data.video[keys[1]].download()
    })

    await t.test('Download video', async () => {
        if (!videoUrl)
            return t.skip('Test skipped -- error getting the video download link!')
        const res = await got(videoUrl).buffer()
        assert.strictEqual(res.byteLength > 0, true)
    })

    let audioUrl: string
    await t.test('Getting audio download link', async () => {
        if (!data)
            return t.skip('Test skipped -- error in getting metadata!')
        const keys = Object.keys(data.audio)
        audioUrl = await data.audio[keys[0]].download()
    })

    await t.test('Download audio', async () => {
        if (!audioUrl)
            return t.skip('Test skipped -- error getting the audio download link!')
        const res = await got(audioUrl).buffer()
        assert.strictEqual(res.byteLength > 0, true)
    })
})