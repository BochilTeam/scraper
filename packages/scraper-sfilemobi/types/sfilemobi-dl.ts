import { z } from 'zod'

const URL_ERROR_MESSAGE = 'Input must be a valid sfile.mobi URL!'
export const SfilemobidlArgsSchema = z.object({
    0: z.string().url({ message: URL_ERROR_MESSAGE }).regex(/^(https?:\/\/)?sfile\.mobi/i, URL_ERROR_MESSAGE)
})
export const SfilemobidlSchema = z.object({
    url: z.string().url(),
    filename: z.string(),
    icon: z.string(),
    type: z.string(),
    mimetype: z.string(),
    uploaded: z.string(),
    uploadby: z.string(),
    uploadbyUrl: z.string().url(),
    uploadon: z.string(),
    uploadonUrl: z.string().url(),
    downloads: z.number()
})
export type Sfilemobidl = z.infer<typeof SfilemobidlSchema>