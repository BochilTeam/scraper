import { z } from 'zod'


const LinkItemSchema = z.object({
    url: z.string().url(),
    name: z.string(),
    subname: z.string(),
    type: z.string(),
    ext: z.string(),
    downloadable: z.boolean(),
    quality: z.string(),
    qualityNumber: z.number(),
    audio: z.boolean(),
    contentLength: z.number().optional(),
    no_audio: z.boolean(),
    itag: z.string(),
    isBundle: z.boolean(),
    isOtf: z.boolean(),
    isDrm: z.boolean(),
    filesize: z.number().optional(),
    attr: z.object({
      title: z.string(),
      class: z.string(),
    }),
  })
export type LinkItem = z.infer<typeof LinkItemSchema>

export const YoutubedlV2ResponseSchema = z.object({
    id: z.string(),
    cipher: z.boolean(),
    meta: z.object({
      title: z.string(),
      source: z.string().url(),
      duration: z.string(),
      tags: z.string(),
    }),
    thumb: z.string().url(),
    itags: z.array(z.string()),
    video_quality: z.array(z.string()),
    url: z.array(LinkItemSchema),
  });