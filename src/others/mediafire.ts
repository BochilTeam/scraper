import got from "got";
import cheerio from "cheerio";
import { Mediafire } from './types'

export async function mediafiredl(url: string): Promise<Mediafire> {
    if (!/https?:\/\/(www\.)?mediafire\.com/.test(url)) throw new Error('Invalid URL: ' + url);
    const data = await got(url).text();
    const $ = cheerio.load(data)
    const Url = $('#downloadButton').attr('href').trim()
    const url2 = $('#download_link > a.retry').attr('href').trim()
    const filename = $('div.dl-info > div.intro > div.filename').text().trim()
    const aploud = $('div.dl-info > ul.details > li').eq(1).find('span').text().trim()
    const filesizeH = $('div.dl-info > ul.details > li').eq(0).find('span').text().trim()
    const filesize = parseFloat(filesizeH) * (/GB/i.test(filesizeH) ? 1000000 : /MB/i.test(filesizeH) ? 1000 : /KB/i.test(filesizeH) ? 1 : /B/i.test(filesizeH) ? 0.1 : 0)
    return {
        url: Url,
        url2,
        filename,
        aploud,
        filesizeH,
        filesize,
    }
}