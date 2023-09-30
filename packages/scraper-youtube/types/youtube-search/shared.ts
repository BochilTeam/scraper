import { z } from "zod";


export const OwnerBadgeSchema = z.object({
    metadataBadgeRenderer: z.object({
        style: z.string(),
        tooltip: z.string()
    })
})
export const AccessibilitySchema = z.object({
    accessibilityData: z.object({
        label: z.string()
    })
})
export const CollapsedTextSchema = z.object({
    text: z.string()
})
export const CollapsedThumbnailClassSchema = z.object({
    thumbnails: z.array(z.object({
        url: z.string(),
        width: z.number(),
        height: z.number()
    }))
})
export const CollapsedRunsClassSchema = z.object({
    runs: z.array(CollapsedTextSchema)
})
export const TextSchema = z.object({
    accessibility: AccessibilitySchema,
    simpleText: z.string()
})
export const CollapsedSimpleTextSchema = z.object({
    simpleText: z.string()
})
