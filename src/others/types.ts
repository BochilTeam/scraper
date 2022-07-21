import { z } from 'zod'
import { ERROR_ARGS } from '../constant.js'

export const WikipediaArgsSchema = z.object({
  0: z.string(ERROR_ARGS.QUERY),
  1: z.string()
})
export const WikipediaSchema = z.object({
  title: z.string(),
  img: z.string().url(),
  articles: z.string()
})

export type WikipediaArgs = z.infer<typeof WikipediaArgsSchema>
export type Wikipedia = z.infer<typeof WikipediaSchema>

export const ResultJadwalTVSchema = z.object({
  date: z.string(),
  event: z.string()
})
export const JadwalTVArgsSchema = z.object({
  0: z.string(ERROR_ARGS.QUERY)
})
export const JadwalTVSchema = z.object({
  channel: z.string(),
  result: ResultJadwalTVSchema.array()
})
export const JadwalTVNOWSchema = z.record(ResultJadwalTVSchema.array())

export type ResultJadwalTV = z.infer<typeof ResultJadwalTVSchema>
export type JadwalTVArgs = z.infer<typeof JadwalTVArgsSchema>
export type JadwalTV = z.infer<typeof JadwalTVSchema>
export type JadwalTVNOW = z.infer<typeof JadwalTVNOWSchema>

export const MediafireArgsSchema = z.object({
  0: z.string(ERROR_ARGS.URL).url()
})
export const MediafireSchema = z.object({
  url: z.string().url(),
  url2: z.string().url(),
  filename: z.string(),
  filetype: z.string(),
  ext: z.string(),
  aploud: z.string(),
  filesizeH: z.string(),
  filesize: z.number()
})
export type Mediafire = z.infer<typeof MediafireSchema>

export const IBMKGSchema = z.object({
  date: z.string(),
  magnitude: z.string(),
  depth: z.string(),
  location: z.string()
})
export const GempaSchema = z.object({
  locate: z.string(),
  warning: z.string().array()
}).and(IBMKGSchema)
export const GempaNowSchema = z.object({
  latitude: z.string(),
  longitude: z.string()
}).and(IBMKGSchema)
export const TsunamiSchema = z.object({
  locate: z.string()
}).and(IBMKGSchema)

export type IBMKG = z.infer<typeof IBMKGSchema>
export type Gempa = z.infer<typeof GempaSchema>
export type GempaNow = z.infer<typeof GempaNowSchema>
export type Tsunami = z.infer<typeof TsunamiSchema>

export const LyricsArgsSchema = z.object({
  0: z.string(ERROR_ARGS.QUERY)
})
export const LyricsSchema = z.object({
  title: z.string(),
  author: z.string(),
  lyrics: z.string(),
  link: z.string()
})

export type LyricsArgs = z.infer<typeof LyricsArgsSchema>
export type Lyrics = z.infer<typeof LyricsSchema>

export const KbbiArgsSchema = z.object({
  0: z.string(ERROR_ARGS.QUERY)
})
export const KbbiSchema = z.object({
  index: z.number(),
  title: z.string(),
  means: z.string().array().min(1)
})

export type KbbiArgs = z.infer<typeof KbbiArgsSchema>
export type Kbbi = z.infer<typeof KbbiSchema>

export const MinecraftJavaArgsSchema = z.object({
  0: z.string(ERROR_ARGS.IP),
  1: z.number(ERROR_ARGS.PORT).min(0).max(65535),
  2: z.object({
    timeout: z.number().optional()
  }).optional()
})
export const IMinecraftResponseSchema = z.object({
  description: z.object({
    extra: z.object({
      color: z.string(),
      text: z.string(),
      bold: z.boolean().optional()
    }).array(),
    text: z.string()
  }),
  players: z.object({
    max: z.number(),
    online: z.number(),
    sample: z.object({
      name: z.string(),
      id: z.string()
    }).array()
  }),
  version: z.object({
    name: z.string(),
    protocol: z.number()
  }),
  favicon: z.string()
})
export const MinecraftJavaSchema = z.object({
  ip: z.string(),
  port: z.number(),
  description: z.string(),
  descriptionText: z.string(),
  players: z.object({
    max: z.number(),
    online: z.number(),
    sample: z.string().array()
  }),
  version: z.object({
    name: z.string(),
    protocol: z.number()
  }),
  favicon: z.string().optional(),
  ping: z.number(),
  originalResponse: IMinecraftResponseSchema
})

export type IMinecraftResponse = z.infer<typeof IMinecraftResponseSchema>
export type MinecraftJava = z.infer<typeof MinecraftJavaSchema>

export const NameFreeFireArgsSchema = z.object({
  0: z.string().or(z.number())
})
export const NameFreeFireSchema = z.object({
  id: z.string(),
  username: z.string()
})

export type NameFreeFireArgs = z.infer<typeof NameFreeFireArgsSchema>
export type NameFreeFire = z.infer<typeof NameFreeFireSchema>

export const BioskopNowSchema = z.object({
  title: z.string(),
  img: z.string().url(),
  url: z.string().url(),
  genre: z.string(),
  duration: z.string(),
  playingAt: z.string()
})
export const BioskopArgsSchema = z.object({
  0: z.number().or(z.string()).optional()
})
export const BioskopSchema = z.object({
  title: z.string(),
  img: z.string().url(),
  url: z.string().url(),
  genre: z.string(),
  duration: z.string(),
  release: z.string(),
  director: z.string(),
  cast: z.string()
})

export type BioskopNow = z.infer<typeof BioskopNowSchema>
export type BioskopArgs = z.infer<typeof BioskopArgsSchema>
export type Bioskop = z.infer<typeof BioskopSchema>

export const ChordArgsSchema = z.object({
  0: z.string(ERROR_ARGS.QUERY)
})
export const ChordSchema = z.object({
  url: z.string().url(),
  artist: z.string(),
  artistUrl: z.string().url().or(z.string()),
  title: z.string(),
  chord: z.string()
})

export type ChordArgs = z.infer<typeof ChordArgsSchema>
export type Chord = z.infer<typeof ChordSchema>

export const ZippyShareArgsSchema = z.object({
  0: z.string(ERROR_ARGS.URL).url()
})
export const ZippyShareSchema = z.object({
  url: z.string().url(),
  // url2: z.string().url(),
  filename: z.string(),
  filesizeH: z.string(),
  filesize: z.number(),
  aploud: z.string(),
  lastDownload: z.string()
})

export type ZippyShareArgs = z.infer<typeof ZippyShareArgsSchema>
export type ZippyShare = z.infer<typeof ZippyShareSchema>

export const SfileMobiSearchArgsSchema = z.object({
  0: z.string(ERROR_ARGS.QUERY),
  1: z.number().min(0).optional()
})
export const SfileMobiSearchSchema = z.object({
  url: z.string().url(),
  filename: z.string(),
  icon: z.string().url(),
  type: z.string(),
  filesizeH: z.string(),
  filesize: z.number()
})
export const SfileMobiArgsSchema = z.object({
  0: z.string(ERROR_ARGS.URL).url()
})
export const SfileMobiSchema = z.object({
  url: z.string().url(),
  filename: z.string(),
  icon: z.string(),
  type: z.string(),
  mimetype: z.string(),
  aploud: z.string(),
  aploudby: z.string(),
  aploudbyUrl: z.string().url(),
  aploudon: z.string(),
  aploudonUrl: z.string().url(),
  downloads: z.number(),
  filesizeH: z.string(),
  filesize: z.number()
})

export type SfileMobiSearch = z.infer<typeof SfileMobiSearchSchema>
export type SfileMobi = z.infer<typeof SfileMobiSchema>
