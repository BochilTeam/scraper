import { z } from 'zod'
import {
    OwnerBadgeSchema,
    AccessibilitySchema,
    CollapsedTextSchema,
    CollapsedThumbnailClassSchema,
    CollapsedRunsClassSchema,
    TextSchema,
    CollapsedSimpleTextSchema
} from './shared.js'


const ThumbnailOverlaySchema = z.object({
    thumbnailOverlayTimeStatusRenderer: z.object({
        text: z.object({
            accessibility: AccessibilitySchema.optional(),
            simpleText: z.string()
        }),
        style: z.string()
    }).optional()
})
const DetailedMetadataSnippetSchema = z.object({
    snippetText: z.object({
        runs: z.array(CollapsedTextSchema)
    })
})

const TitleSchema = z.object({
    runs: z.array(CollapsedTextSchema),
    accessibility: AccessibilitySchema
})

const RichThumbnailSchema = z.object({
    movingThumbnailRenderer: z.object({
        movingThumbnailDetails: CollapsedThumbnailClassSchema
    })
})
const ChannelThumbnailSupportedRenderersSchema = z.object({
    channelThumbnailWithLinkRenderer: z.object({
        thumbnail: CollapsedThumbnailClassSchema
    })
})

export const VideoRendererSchema = z.object({
    videoId: z.string(),
    thumbnail: CollapsedThumbnailClassSchema,
    title: TitleSchema,
    longBylineText: CollapsedRunsClassSchema,
    publishedTimeText: CollapsedSimpleTextSchema.optional(),
    lengthText: TextSchema.optional(),
    viewCountText: CollapsedSimpleTextSchema.partial(),
    // navigationEndpoint:                 Endpoint;
    // badges?:                             Badge[],
    ownerBadges: z.array(OwnerBadgeSchema).optional(),
    ownerText: CollapsedRunsClassSchema,
    shortBylineText: CollapsedRunsClassSchema,
    // trackingParams:                     string;
    // showActionMenu:                     boolean;
    shortViewCountText: TextSchema.partial(),
    // menu:                               VideoRendererMenu;
    channelThumbnailSupportedRenderers: ChannelThumbnailSupportedRenderersSchema,
    thumbnailOverlays: z.array(ThumbnailOverlaySchema),
    richThumbnail: RichThumbnailSchema.optional(),
    detailedMetadataSnippets: z.array(DetailedMetadataSnippetSchema),
})
export type VideoRenderer = z.infer<typeof VideoRendererSchema>