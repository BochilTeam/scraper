import { TypeOf, z } from 'zod'

export const FacebookDownloaderArgsSchema = z.object({
  0: z.string().url()
})
export const FacebookDownloaderSchema = z.object({
  id: z.string(),
  thumbnail: z.string(),
  duration: z.number(),
  result: z.object({
    size: z.string().or(z.number()).optional(),
    ext: z.string(),
    url: z.string(),
    quality: z.string().optional(),
    vcodec: z.string().optional(),
    fid: z.string(),
    isVideo: z.boolean(),
    isAudio: z.boolean()
  }).array().min(1)
})
export const FacebookDownloaderV2Schema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  result: z.object({
    quality: z.string(),
    url: z.string()
  }).array().min(1)
})
export type FacebookDownloaderArgs = z.infer<typeof FacebookDownloaderArgsSchema>
export type FacebookDownloader = z.infer<typeof FacebookDownloaderSchema>
export type FacebookDownloaderV2 = z.infer<typeof FacebookDownloaderV2Schema>

export const InstagramDownloaderArgsSchema = z.object({
  0: z.string().url()
})
export const IinstagramDownloaderSchema = z.object({
  url: z.string()
})
export const InstagramDownloaderSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  thumbnail: z.string().url(),
  duration: z.string(),
  source: z.string(),
  medias: z.object({
    url: z.string().url(),
    quality: z.string(),
    formattedSize: z.string(),
    extension: z.string(),
    audioAvailable: z.boolean(),
    videoAvailable: z.boolean(),
    cached: z.boolean(),
    chunked: z.boolean()
  }).array().min(1)
})

export type IinstagramDownloader = z.infer<typeof IinstagramDownloaderSchema>
export type InstagramDownloaderArgs = z.infer<typeof InstagramDownloaderArgsSchema>
export type InstagramDownloader = z.infer<typeof InstagramDownloaderSchema>

export const IinstagramStorySchema = z.object({
  user: z.object({
    username: z.string(),
    profilePicUrl: z.string()
  }),
  results: z.object({
    thumbnail: z.string(),
    url: z.string(),
    type: z.string(),
    isVideo: z.boolean()
  }).array().min(1)
})

export const InstagramStoryArgsSchema = z.object({
  0: z.string()
})


export type IinstagramStory = z.infer<typeof IinstagramStorySchema>
export type InstagramStoryArgs = z.infer<typeof InstagramStoryArgsSchema>
export type InstagramStory = IinstagramStory

export const TiktokDownloaderArgsSchema = z.object({
  0: z.string().url()
})

export const TiktokDownloaderSchema = z.object({
  author: z.object({
    nickname: z.string(),
    unique_id: z.string(),
    avatar: z.string()
  }),
  video: z.object({
    no_watermark: z.string(),
    no_watermark_hd: z.string()
  })
})


export type TiktokDownloaderArgs = z.infer<typeof TiktokDownloaderArgsSchema>
export type TiktokDownloader = z.infer<typeof TiktokDownloaderSchema>

export const GoogleItArgsSchema = z.object({
  0: z.string()
})
export const GoogleItSchema = z.object({
  info: z.object({
    title: z.string().optional(),
    type: z.string().optional(),
    description: z.string().optional(),
    image: z.string().array().optional()
  }),
  articles: z.object({
    header: z.string(),
    title: z.string(),
    url: z.string(),
    description: z.string()
  }).array()
})
export type GoogleItArgs = z.infer<typeof GoogleItArgsSchema>
export type GoogleIt = z.infer<typeof GoogleItSchema>

export const TwitterDownloaderArgsSchema = z.object({
  0: z.string().url()
})
export const ItwitterDownloaderSchema = z.object({
  quality: z.string(),
  type: z.string(),
  url: z.string().url()
})
export const TwitterDownloaderSchema = z.object({
  isVideo: z.boolean()
}).and(ItwitterDownloaderSchema)
export const TwitterDownloaderV2Schema = ItwitterDownloaderSchema

export type TwitterDownloaderArgs = z.infer<typeof TwitterDownloaderArgsSchema>
export type ItwitterDownloader = z.infer<typeof ItwitterDownloaderSchema>
export type TwitterDownloader = z.infer<typeof TwitterDownloaderSchema>

export const YoutubeSearchSchema = z.object({
  video: z.array(z.object({
    authorName: z.string(),
    authorAvatar: z.string(),
    videoId: z.string(),
    url: z.string().url(),
    thumbnail: z.string().url(),
    title: z.string(),
    description: z.string(),
    publishedTime: z.string(),
    durationH: z.string(),
    durationS: z.number(),
    duration: z.string(),
    viewH: z.string(),
    view: z.string(),
    type: z.literal('video')
  })),
  channel: z.array(z.object({
    channelId: z.string(),
    url: z.string().url(),
    channelName: z.string(),
    username: z.string(),
    avatar: z.string(),
    isVerified: z.boolean(),
    subscriberH: z.string(),
    subscriber: z.string(),
    description: z.string(),
    type: z.literal('channel')
  })),
  playlist: z.array(z.object({
    playlistId: z.string(),
    title: z.string(),
    thumbnail: z.string(),
    video: z.array(z.object({
      videoId: z.string(),
      title: z.string(),
      durationH: z.string(),
      duration: z.string(),
    })),
    type: z.literal('mix')
  }))
})
export type YoutubeSearch = z.infer<typeof YoutubeSearchSchema>

export const YoutubeDownloaderArgsSchema = z.object({
  0: z.string().url(),
  1: z.string().optional()
})
export const YoutubeVideoOrAudioSchema = z.record(z.object({
  quality: z.string(),
  fileSizeH: z.string(),
  fileSize: z.number(),
  download: z.function().returns(z.promise(z.string().url()))
}))
export const YoutubeDownloaderSchema = z.object({
  id: z.string(),
  thumbnail: z.string().url(),
  title: z.string(),
  video: YoutubeVideoOrAudioSchema,
  audio: YoutubeVideoOrAudioSchema
})
export const YoutubeDownloaderV2ArgsSchema = z.object({
  0: z.string().url()
})
export const YoutubeConvertSchema = z.string().url()

export type YoutubeDownloaderArgs = z.infer<typeof YoutubeDownloaderArgsSchema>
export type YoutubeVideoOrAudio = z.infer<typeof YoutubeVideoOrAudioSchema>
export type YoutubeDownloader = z.infer<typeof YoutubeDownloaderSchema>
export type YoutubeDownloaderV2Args = z.infer<typeof YoutubeDownloaderV2ArgsSchema>
export type YoutubeConvert = z.infer<typeof YoutubeConvertSchema>

export const GroupWAArgsSchema = z.object({
  0: z.string()
})
export const GroupWASchema = z.object({
  url: z.string().url(),
  subject: z.string()
})

export type GroupWAArgs = z.infer<typeof GroupWAArgsSchema>
export type GroupWA = z.infer<typeof GroupWASchema>

export const AiovideodlArgsSchema = z.object({
  0: z.string().url()
})

export const AiovideodlSchema = z.object({
  url: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  duration: z.string().nullable().optional(),
  source: z.string(),
  medias: z.object({
    url: z.string(),
    quality: z.string(),
    extension: z.string(),
    size: z.number(),
    formattedSize: z.string(),
    videoAvailable: z.boolean(),
    audioAvailable: z.boolean(),
    chunked: z.boolean(),
    cached: z.boolean()
  }).array(),
  sid: z.any().nullable().optional()
})

export type AiovideodlArgs = z.infer<typeof AiovideodlArgsSchema>
export type Aiovideodl = z.infer<typeof AiovideodlSchema>

export const SaveFromArgsSchema = z.object({
  0: z.string().url()
})

export const SaveFromSchema = z.object({
  id: z.string().optional(),
  url: z.object({
    url: z.string().url(),
    ext: z.string(),
    type: z.string(),
    name: z.string(),
    quality: z.number().optional(),
    subname: z.string().optional()
  }).array().min(1).optional(),
  meta: z.object({
    title: z.string(),
    source: z.string().url().optional(),
    duration: z.string().optional()
  }),
  video_quality: z.string().array().optional(),
  thumb: z.string(),
  sd: z.object({
    url: z.string().url(),
    format: z.string().optional()
  }).nullable(),
  hd: z.object({
    url: z.string().url(),
    format: z.string().optional()
  }).nullable(),
  hosting: z.string()
})

export type SaveFromArgs = z.infer<typeof SaveFromArgsSchema>
export type Savefrom = z.infer<typeof SaveFromSchema>

export const SnapSaveArgsSchema = z.object({
  0: z.string().url()
})
export const SnapSaveSchema = z.object({
  filesize: z.number().optional(),
  resolution: z.string().optional(),
  thumbnail: z.string().url().optional(),
  url: z.string().url()
})

export type SnapSaveArgs = z.infer<typeof SnapSaveArgsSchema>
export type SnapSave = z.infer<typeof SnapSaveSchema>
