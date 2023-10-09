import { z } from 'zod'

export const MediafiredlArgsSchema = z.object({
    0: z.string().url()
})
export const MediafiredlSchema = z.object({
    url: z.string().url(),
    url2: z.string().url(),
    filename: z.string(),
    filetype: z.string(),
    ext: z.string(),
    aploud: z.string(),
    filesizeH: z.string(),
    filesize: z.number()
})
export type Mediafiredl = z.infer<typeof MediafiredlSchema>