import { z } from 'zod'

export const InstagramdlArgsSchema = z.object({
    0: z.string().url()
})
export const InstagramdlItemSchema = z.object({
    thumbnail: z.string().url(),
    url: z.string().url()
})
export type InstagramdlItem = z.infer<typeof InstagramdlItemSchema>
export const InstagramdlSchema = z.array(InstagramdlItemSchema)
export type Instagramdl = z.infer<typeof InstagramdlSchema>