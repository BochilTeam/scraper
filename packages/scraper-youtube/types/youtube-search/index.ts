import { z } from 'zod'
import { VideoRendererSchema } from './video.js'
import { ChannelRendererSchema } from './channel.js'

const ItemSectionRendererContentSchema = z.object({
    // searchPyvRenderer: SearchPyvRendererSchema.optional(),
    videoRenderer: VideoRendererSchema.optional(),
    // reelShelfRenderer: ReelShelfRendererSchema.optional(),
    // shelfRenderer: ShelfRendererSchema.optional(),
    // radioRenderer: RadioRendererSchema.optional(),
    // horizontalCardListRenderer: ContentHorizontalCardListRendererSchema.optional(),
    channelRenderer: ChannelRendererSchema.optional()
})
export type ItemSectionRendererContent = z.infer<typeof ItemSectionRendererContentSchema>

const SectionListRendererContentSchema = z.object({
    itemSectionRenderer: z.object({
        contents: z.array(ItemSectionRendererContentSchema)
    }).optional()
})
const TwoColumnSearchResultsRendererSchema = z.object({
    primaryContents: z.object({
        sectionListRenderer: z.object({
            contents: z.array(SectionListRendererContentSchema),
        })
    })
})
export const YoutubeSearchResponseSchema = z.object({
    contents: z.object({
        twoColumnSearchResultsRenderer: TwoColumnSearchResultsRendererSchema
    })
})
export const YoutubeSearchArgsSchema = z.object({
    0: z.string()
})
export const YoutubeSearchVideoSchema = z.object({
    videoId: z.string(),
    url: z.string().url(),
    title: z.string(),
    thumbnail: z.string().url(),
    description: z.string(),
    movingThumbnail: z.string().url(),
    channelName: z.string(),
    channelAvatar: z.string().url(),
    isChannelVerified: z.boolean(),
    publishedTime: z.string(),
    viewH: z.string(),
    view: z.number().int(),
    durationH: z.string(),
    duration: z.number().int(),
})
export type YoutubeSearchVideo = z.infer<typeof YoutubeSearchVideoSchema>
export const YoutubeSearchChannelSchema = z.object({
    channelId: z.string(),
    url: z.string().url(),
    channelName: z.string(),
    username: z.string(),
    avatar: z.string().url(),
    isChannelVerified: z.boolean(),
    subscriberH: z.string(),
    description: z.string(),
})
export type YoutubeSearchChannel = z.infer<typeof YoutubeSearchChannelSchema>
export const YoutubeSearchSchema = z.object({
    video: z.array(YoutubeSearchVideoSchema),
    channel: z.array(YoutubeSearchChannelSchema)
})
export type YoutubeSearch = z.infer<typeof YoutubeSearchSchema>
