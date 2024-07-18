import { z } from 'zod'

export const TwitterDlArgsSchema = z.object({
  0: z.string().url()
})

export const TwitterDLVariantSchema = z.object({
  bitrate: z.number().optional(),
  content_type: z.string(),
  url: z.string().url(),
  height: z.preprocess(
    (data) => typeof data === 'number' ? data.toString() : data,
    z.string()),
  width: z.preprocess(
    (data) => typeof data === 'number' ? data.toString() : data,
    z.string())
})

export const TwitterDLResponseSchema = z.object({
  includes: z.object({
    media: z.array(z.object({
      media_url_https: z.string().url(),
      type: z.string(),
      variants: z.array(TwitterDLVariantSchema)
    }))
  })
})

export const TwitterDlSchema = TwitterDLVariantSchema.array()
export type TwitterDl = z.infer<typeof TwitterDlSchema>
