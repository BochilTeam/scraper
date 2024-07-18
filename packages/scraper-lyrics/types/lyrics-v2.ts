import { z } from 'zod'

export const LyricsV2SearchSectionSchema = z.object({
    hits: z.object({
        type: z.string(),
        result: z.object({
            api_path: z.string(),
            url: z.string().url()
        })
    }).array(),
    type: z.string()
})

export const LyricsV2SearchResponseSchema = z.object({
    response: z.object({
        sections: LyricsV2SearchSectionSchema.array()
    })
})

export const LyricsV2MetadataSongSchema = z.object({
    id: z.number(),
    artist_names: z.string(),
    full_title: z.string(),
    description_preview: z.string(),
    apple_music_player_url: z.string().url(),
    soundcloud_url: z.string().url().nullish(),
    spotify_uuid: z.string().nullish(),
    youtube_url: z.string().url(),
    release_date_components: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number()
    }),
    header_image_thumbnail_url: z.string().url(),
    header_image_url: z.string().url(),
    album: z.object({
        name: z.string()
    })
})


export const LyricsV2MetadataResponseSchema = z.object({
    response: z.object({
        song: LyricsV2MetadataSongSchema
    })
})


export const LyricsV2Schema = z.object({
    id: z.number(),
    title: z.string(),
    url: z.string().url(),
    artist: z.string(),
    album: z.string(),
    albumCover: z.string().url(),
    release: z.string().datetime(),
    spotify: z.string().url().optional(),
    youtube:z.string().url().optional(),
    soundcloud: z.string().url().optional(),
    appleMusicPlayer: z.string().url().optional(),
    lyrics: z.object({
        type: z.literal('header').or(z.literal('lyric')),
        url: z.string().url().optional(),
        text: z.string()
    }).array()
})