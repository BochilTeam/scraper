import { z } from 'zod'

export const BioskopNowSchema = z.object({
    title: z.string(),
    img: z.string().url(),
    url: z.string().url(),
    genre: z.string(),
    duration: z.string(),
    playingAt: z.string()
})
export const BioskopArgsSchema = z.object({
    0: z.number().or(z.string()).optional()
})
export const BioskopSchema = z.object({
    title: z.string(),
    img: z.string().url(),
    url: z.string().url(),
    genre: z.string(),
    duration: z.string(),
    release: z.string(),
    director: z.string(),
    cast: z.string()
})

export type BioskopNow = z.infer<typeof BioskopNowSchema>
export type BioskopArgs = z.infer<typeof BioskopArgsSchema>
export type Bioskop = z.infer<typeof BioskopSchema>

export const ChordArgsSchema = z.object({
    0: z.string()
})
export const ChordSchema = z.object({
    url: z.string().url(),
    artist: z.string(),
    artistUrl: z.string().url().or(z.string()),
    title: z.string(),
    chord: z.string()
})
export type ChordArgs = z.infer<typeof ChordArgsSchema>
export type Chord = z.infer<typeof ChordSchema>

export const NameFreeFireArgsSchema = z.object({
    0: z.string().or(z.number())
})
export const NameFreeFireSchema = z.object({
    id: z.string(),
    username: z.string()
})
export type NameFreeFireArgs = z.infer<typeof NameFreeFireArgsSchema>
export type NameFreeFire = z.infer<typeof NameFreeFireSchema>

export const ResultJadwalTVSchema = z.object({
    date: z.string(),
    event: z.string()
})
export const JadwalTVArgsSchema = z.object({
    0: z.string()
})
export const JadwalTVSchema = z.object({
    channel: z.string(),
    result: ResultJadwalTVSchema.array()
})
export const JadwalTVNOWSchema = z.record(ResultJadwalTVSchema.array())
export type ResultJadwalTV = z.infer<typeof ResultJadwalTVSchema>
export type JadwalTVArgs = z.infer<typeof JadwalTVArgsSchema>
export type JadwalTV = z.infer<typeof JadwalTVSchema>
export type JadwalTVNOW = z.infer<typeof JadwalTVNOWSchema>

export const KbbiArgsSchema = z.object({
    0: z.string()
})
export const KbbiSchema = z.object({
    index: z.number(),
    title: z.string(),
    means: z.string().array().min(1)
})
export type KbbiArgs = z.infer<typeof KbbiArgsSchema>
export type Kbbi = z.infer<typeof KbbiSchema>