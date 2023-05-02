import { z } from 'zod'


export const GoogleImageSchema = z.string().url()
export type GoogleImage = z.infer<typeof GoogleImageSchema>

export const PinterestSchema = z.string().url()
export type Pinterest = z.infer<typeof PinterestSchema>

export const StickerTelegramSchema = z.object({
    title: z.string(),
    icon: z.string(),
    link: z.string().url(),
    stickers: z.array(z.string().url())
})
export type StickerTelegram = z.infer<typeof StickerTelegramSchema>


export interface ResponseStickerLine {
    title: string;
    productUrl: string;
    id: string;
    description?: string;
    payloadForProduct: {
        staticUrl: string;
        animationUrl?: string;
        soundUrl?: string;
    };
    authorId: string;
    authorName: string;
}

export const StickerLineSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional().nullable(),
    url: z.string().url(),
    sticker: z.string(),
    stickerAnimated: z.string().optional().nullable(),
    stickerSound: z.string().optional().nullable(),
    authorId: z.string(),
    authorName: z.string()
})
export type StickerLine = z.infer<typeof StickerLineSchema>

export const WallpaperSchema = z.string().url()
export type Wallpaper = z.infer<typeof WallpaperSchema>