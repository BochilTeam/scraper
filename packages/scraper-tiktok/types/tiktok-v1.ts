import { z } from 'zod'

export const TiktokDlArgsSchema = z.object({
  0: z.string().url()
})

export const TiktokDlSchema = z.object({
  nickname: z.string(),
  username: z.string(),
  avatar: z.string().url(),
  description: z.string(),
  thumbnail: z.string().url(),
  played: z.string(),
  commented: z.string(),
  saved: z.string(),
  shared: z.string(),
  song: z.string(),
  video: z.object({
    noWatermark: z.string().url(),
    withWatermark: z.string().url()
  }),
  audio: z.string().url()
})
export type TiktokDl = z.infer<typeof TiktokDlSchema>
