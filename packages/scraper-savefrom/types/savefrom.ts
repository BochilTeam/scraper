import { z } from 'zod'

export const SavefromArgsSchema = z.object({
    0: z.string().url()
})
export const SavefromUrlItemSchema = z.object({
    url: z.string().url(),
    name: z.string(),
    type: z.string(),
    ext: z.string(),
})
export const SavefromVideoSchema = z.object({
    url: z.string().url(),
    format: z.string().optional()
})
export const SavefromItemSchema = z.object({
    url: z.array(SavefromUrlItemSchema),
    thumb: z.string().url(),
    sd: SavefromVideoSchema.nullish(),
    meta: z.object({
        title: z.string(),
        source: z.string().url(),
        duration: z.string().optional(),
        tags: z.string().optional()
    }),
    video_quality: z.array(z.string()).optional(),
    hosting: z.string().optional(),
    hd: SavefromVideoSchema.nullish(),
})
export const SavefromSchema = z.array(SavefromItemSchema)
export type Savefrom = z.infer<typeof SavefromSchema>