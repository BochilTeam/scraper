import { z } from 'zod'

export const SnapSaveArgsSchema = z.object({
    0: z.string().url()
})

export const SnapSaveSchema = z.object({
    description: z.string().optional(),
    title: z.string().optional(),
    results: z.array(z.object({
        resolution: z.string().optional(),
        thumbnail: z.string().url().optional(),
        url: z.string().url()
    }))
})
export type SnapSave = z.infer<typeof SnapSaveSchema>