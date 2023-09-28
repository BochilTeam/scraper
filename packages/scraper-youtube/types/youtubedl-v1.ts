import { z } from 'zod'

const LinkItemSchema = z.object({
    size: z.string(),
    f: z.string(),
    q: z.string(),
    q_text: z.string(),
    k: z.string(),
})
export type LinkItem = z.infer<typeof LinkItemSchema>

const LinksSchema = z.object({
    mp4: z.record(LinkItemSchema),
    mp3: z.record(LinkItemSchema),
    other: z.record(LinkItemSchema),
})

const RelatedContentSchema = z.object({
    v: z.string(),
    t: z.string(),
})

const RelatedVideosSchema = z.object({
    title: z.string(),
    contents: z.array(RelatedContentSchema),
})

export const YoutubedlResponseSchema = z.object({
    status: z.string(),
    mess: z.string(),
    page: z.string(),
    vid: z.string(),
    extractor: z.string(),
    title: z.string(),
    t: z.number(),
    a: z.string(),
    links: LinksSchema,
    related: z.array(RelatedVideosSchema),
})

export const ConvertResponseSchema = z.object({
    status: z.string(),
    mess: z.string(),
    c_status: z.string(),
    vid: z.string(),
    title: z.string(),
    ftype: z.string(),
    fquality: z.string(),
    dlink: z.string().url(),
});
