import { z } from 'zod'

export const LyricsArgsSchema = z.object({
    0: z.string()
})
export type LyricsArgs = z.infer<typeof LyricsArgsSchema>

export const LyricsMetadataBestMatchSchema = z.object({
    id: z.number(),
    type: z.string()
})
export const LyricsMetadataTrackSchema = z.object({
    track: z.object({
        track_id: z.number(),
        track_spotify_id: z.string(),
        track_share_url: z.string().url(),
        track_name: z.string(),
        artist_name: z.string(),
        album_name: z.string(),
        first_release_date: z.string().datetime(),
        album_coverart_100x100: z.preprocess((str) => str || undefined, z.string().url().optional()),
        album_coverart_350x350: z.preprocess((str) => str || undefined, z.string().url().optional()),
        album_coverart_500x500: z.preprocess((str) => str || undefined, z.string().url().optional()),
        album_coverart_800x800: z.preprocess((str) => str || undefined, z.string().url().optional())
    })
})
export const LyricsMetadataResponseSchema = z.object({
    message: z.object({
        body: z.object({
            macro_result_list: z.object({
                best_match: LyricsMetadataBestMatchSchema,
                track_list: z.array(LyricsMetadataTrackSchema)
            })
        })
    })
})
export const LyricsSchema = z.object({
    id: z.number(),
    title: z.string(),
    url: z.string().url(),
    artist: z.string(),
    album: z.string(),
    albumCover: z.string().url(),
    release: z.string().datetime(),
    spotify: z.string().url(),
    lyrics: z.object({
        type: z.literal('header').or(z.literal('lyric')),
        text: z.string()
    }).array()
})
export type LyricsMetadataResponse = z.infer<typeof LyricsMetadataResponseSchema>
export type Lyrics = z.infer<typeof LyricsSchema>