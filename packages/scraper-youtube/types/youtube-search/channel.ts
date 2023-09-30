import { z } from 'zod'
import {
    OwnerBadgeSchema,
    CollapsedTextSchema,
    CollapsedThumbnailClassSchema,
    CollapsedRunsClassSchema,
    TextSchema,
    CollapsedSimpleTextSchema
} from './shared.js'

const BylineTextRunSchema = z.object({
    text: z.string(),
    navigationEndpoint: z.object({
        commandMetadata: z.object({
            webCommandMetadata: z.object({
                url: z.string()
            })
        }),
        browseEndpoint: z.object({
            canonicalBaseUrl: z.string()
        })
    })
})
const BylineTextSchema = z.object({
    runs: z.array(BylineTextRunSchema)
})
export const ChannelRendererSchema = z.object({
    channelId: z.string(),
    title: CollapsedTextSchema.partial(),
    // navigationEndpoint:  RunNavigationEndpoint;
    thumbnail: CollapsedThumbnailClassSchema,
    descriptionSnippet: CollapsedRunsClassSchema,
    shortBylineText: BylineTextSchema,
    videoCountText: TextSchema,
    // subscriptionButton:  SubscriptionButton;
    ownerBadges: z.array(OwnerBadgeSchema),
    subscriberCountText: CollapsedSimpleTextSchema,
    // subscribeButton:     SubscribeButton;
    // trackingParams:      string;
    longBylineText: BylineTextSchema,
})