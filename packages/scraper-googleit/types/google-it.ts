import { z } from 'zod'

export const GoogleItArgsSchema = z.object({
  0: z.string()
})

export const GoogleItSchema = z.object({

  title: z.string().optional(),
  type: z.string().optional(),
  description: z.string().optional(),
  // image: z.string().array().optional(),
  related: z.string().array(),
  articles: z.object({
    header: z.string(),
    iconBase64: z.string().optional(),
    title: z.string(),
    url: z.string(),
    thumbnail: z.string().optional(),
    gif: z.string().url().optional(),
    description: z.string(),
    footer: z.string().optional()
  }).array()
})
export type GoogleIt = z.infer<typeof GoogleItSchema>
