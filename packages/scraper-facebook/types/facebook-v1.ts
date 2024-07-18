import { z } from 'zod'

export const FacebookDlArgsSchema = z.object({
  0: z.string().url()
})

export const FacebookDlMediaSchema = z.array(z.object({
  quality: z.string(),
  download: z.function(z.tuple([])).returns(z.promise(z.string().url()))
}))
export const FacebookDlSchema = z.object({
  thumbnail: z.string().url(),
  duration: z.string().optional(),
  video: FacebookDlMediaSchema,
  audio: FacebookDlMediaSchema
})
export type FacebookDlMediaSchema = z.infer<typeof FacebookDlMediaSchema>
export type FacebookDl = z.infer<typeof FacebookDlSchema>
