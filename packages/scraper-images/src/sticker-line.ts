import got from 'got'
import {
    ResponseStickerLine,
    StickerLine,
    StickerLineSchema
} from '../types/index.js'

export default async function stickerLine(query: string): Promise<StickerLine[]> {
    const data: { items: ResponseStickerLine[] } = await got(
        `https://store.line.me/api/search/sticker?query=${query}&offset=0&limit=36&type=ALL&includeFacets=true`
    ).json()
    return data.items.map(
        ({
            title,
            productUrl,
            id,
            description,
            payloadForProduct: { staticUrl, animationUrl, soundUrl },
            authorId,
            authorName
        }) => {
            return StickerLineSchema.parse({
                id,
                title,
                description,
                url: encodeURI('https://store.line.me' + productUrl),
                sticker: staticUrl,
                stickerAnimated: animationUrl,
                stickerSound: soundUrl,
                authorId,
                authorName
            })
        }
    )
}
