import got from 'got'
import * as cheerio from 'cheerio'
import { LyricsArgsSchema } from '../types/index.js'
import {
    LyricsV2MetadataResponseSchema,
    LyricsV2Schema,
    LyricsV2SearchResponseSchema
} from '../types/lyrics-v2.js'

/**
 * Scrape from https://genius.com
 */
export default async function lyricsv2(query: string) {
    LyricsArgsSchema.parse(arguments)

    const search = await got(`https://genius.com/api/search/multi?per_page=5&q=${encodeURIComponent(query).replace(/%20/, '+')}`).json()
    const json = LyricsV2SearchResponseSchema.parse(search)
    const sections = json.response.sections.find((section) => section.type === 'song')!
    const { api_path, url } = sections.hits[0].result

    const [
        data,
        html
    ] = await Promise.all([
        got(`https://genius.com/api${api_path}`).json(),
        got(url).text()
    ])

    const metadata = LyricsV2MetadataResponseSchema.parse(data)
    const {
        id,
        full_title,
        artist_names,
        album,
        header_image_url,
        header_image_thumbnail_url,
        description_preview,
        release_date_components,
        spotify_uuid,
        youtube_url,
        soundcloud_url,
        apple_music_player_url
    } = metadata.response.song
    const $ = cheerio.load(html)
    const $lyrics = $('#lyrics-root > div[data-lyrics-container="true"]')
    const lyrics = (
        $lyrics.find('a').length ?
            //  The lyric has meaning
            $lyrics.find('a').map(function () {
                const $el = $(this)
                const url = encodeURI('https://genius.com' + $el.attr('href'))
                const $span = $el.find('span')
                // https://github.com/cheeriojs/cheerio/issues/839#issuecomment-205077830
                const html = $span.html()!.replace(/<br>/g, '\n')
                const text = $span.html(html).text().trim()
                if (!text) return false
                return {
                    type: /\[.*?\]/.test(text) ? 'header' : 'lyric',
                    url,
                    text
                }
            }).toArray()
            // Only lyric 
            : $lyrics.html()!.replace(/<br>/g, '\n').split('\n').map((text) => {
                if (!text) return false
                return {
                    type: /\[.*?\]/.test(text) ? 'header' : 'lyric',
                    text: text.trim()
                }
            })
    ).filter(Boolean)

    const result = {
        id,
        title: full_title,
        url,
        artist: artist_names,
        album: album.name,
        albumCover: header_image_url || header_image_thumbnail_url,
        release: new Date(release_date_components.year, release_date_components.month - 1, release_date_components.day).toISOString(),
        description: description_preview,
        ...(spotify_uuid ? { spotify: `https://open.spotify.com/track/${spotify_uuid}` } : {}),
        youtube: youtube_url,
        soundcloud: soundcloud_url,
        appleMusicPlayer: apple_music_player_url,
        lyrics
    }

    return LyricsV2Schema.parse(result)
}