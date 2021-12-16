import axios from "axios";
import cheerio from "cheerio";

export async function stickerTelegram(query: string, page?: number): Promise<{
    title: string,
    icon: string,
    link: string,
    stickers: string[],
}[]> {
    const { data } = await axios.get(`https://combot.org/telegram/stickers?q=${encodeURI(query)}&page=${page || 1}`)
    const $ = cheerio.load(data)
    let results = []
    $('body > div > main > div.page > div > div.stickers-catalogue > div.tab-content > div > div').each(function () {
        const title = $(this).find('.sticker-pack__title').text()?.trim()
        const icon = $(this).find('.sticker-pack__sticker > div.sticker-pack__sticker-inner > div.sticker-pack__sticker-img').attr('data-src')
        const link = $(this).find('.sticker-pack__header > a.sticker-pack__btn').attr('href')
        let stickers = []
        $(this).find('.sticker-pack__list > div.sticker-pack__sticker').each(function () {
            const sticker = $(this).find('.sticker-pack__sticker-inner > div.sticker-pack__sticker-img').attr('data-src')
            stickers.push(sticker)
        })
        results.push({
            title,
            icon,
            link,
            stickers
        })
    })
    return results
}

export async function stickerLine(query: string): Promise<{
    id: string,
    title: string,
    description?: string,
    url: string,
    sticker: string,
    stickerAnimated?: string,
    stickerSound?: string,
    authorId: string,
    authorName: string
}[]> {
    const { data } = await axios.get(`https://store.line.me/api/search/sticker?query=${query}&offset=0&limit=36&type=ALL&includeFacets=true`)
    return data.items.map(({ title, productUrl, id, description, payloadForProduct: { staticUrl, animationUrl, soundUrl }, authorId, authorName }) => {
        return {
            id,
            title,
            description,
            url: encodeURI('https://store.line.me' + productUrl),
            sticker: staticUrl,
            stickerAnimated: animationUrl,
            stickerSound: soundUrl,
            authorId,
            authorName
        }
    })
}