import { z } from 'zod'

export const SfilemobiSearchArgsSchema = z.object({
    0: z.string(),
    1: z.number().min(1).optional().default(1)
})
export const SfilemobiSearchSchema = z.array(z.object({
    url: z.string().url(),
    filename: z.string(),
    icon: z.string().url(),
    type: z.string(),
    filesizeH: z.string(),
    filesize: z.number()
}))
export type SfilemobiSearch = z.infer<typeof SfilemobiSearchSchema>