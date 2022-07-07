import cheerio from 'cheerio'
import got from 'got'
import { randomBytes } from '../encryptions/crypto.js'
import {
  ScraperError,
  decodeSnapApp,
  getEncodedSnapApp
} from '../utils.js'
import {
  FacebookDownloaderArgsSchema,
  FacebookDownloaderSchema,
  FacebookDownloader,
  FacebookDownloaderV2Schema,
  FacebookDownloaderV2,
  FacebookDownloaderV3Schema,
  FacebookDownloaderV3
} from './types.js'

interface Ires {
  size?: string;
  ext: string;
  url: string;
  quality?: string;
  vcodec?: string;
  fid: string;
}

// only support download video yet
export async function facebookdl (url: string): Promise<FacebookDownloader> {
  FacebookDownloaderArgsSchema.parse(arguments)
  /* eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"] */
  const {
    data: { id, thumbnail, duration, a, av, v }
  }: {
    data: {
      id: string;
      thumbnail: string;
      duration: number;
      a: Ires[];
      av: Ires[];
      v: Ires[];
    };
  } = await got('https://youtube4kdownloader.com/ajax/getLinks.php', {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
    },
    searchParams: {
      video: url,
      rand: randomBytes(13)
    }
  }).json()
  const result: FacebookDownloader['result'] = (a || [])
    .concat(av)
    .concat(v)
    .map(({ size, ext, url, quality, vcodec, fid }) => {
      const isVideo = ext === 'mp4'
      const isWebm = ext === 'webm'
      return {
        size,
        ext,
        url,
        quality,
        vcodec,
        fid,
        isVideo: isVideo || isWebm,
        isAudio: /audio/i.test(quality || '') || (isVideo && !isWebm)
      }
      // ext webm video without audio
    })
  if (!result.length) throw new ScraperError(`Can't download!\n${JSON.stringify({ id, thumbnail, duration, a, av, v }, null, 2)}`)

  const res = {
    id,
    thumbnail,
    duration,
    result
  }
  return FacebookDownloaderSchema.parse(res)
}

export async function facebookdlv2 (url: string): Promise<FacebookDownloaderV2> {
  FacebookDownloaderArgsSchema.parse(arguments)

  const params: { url: string } = {
    url: encodeURI(url)
  }
  const res = await got
    .post('https://snapsave.app/action.php', {
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/x-www-form-urlencoded',
        origin: 'https://snapsave.app',
        referer: 'https://snapsave.app/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/96.0.4664.110 Safari/537.36'
      },
      form: params
    }).text()
  const decodeParams = getEncodedSnapApp(res)
  let html: string
  if (!Array.isArray(decodeParams) || decodeParams.length !== 6) html = (typeof res === 'string' ? JSON.parse(res) : res)?.data
  else {
    const decode = decodeSnapApp(...decodeParams)
    // console.debug(decode)
    html = decode?.split('("download-section").innerHTML = "')[1]
      ?.split('; parent.document.getElementById("inputData").remove();')[0]
      ?.split('</style><section class=')[1].split('"> ')
      ?.slice(1)?.map(v => (v + '">').trim()).join()
      ?.split('</section><div class=')[0]?.replace(/\\(\\)?/g, '')
  }
  if (!html) throw new ScraperError(`Can't parse encode params!\n${res}`)
  const result: FacebookDownloaderV2['result'] = []
  const $ = cheerio.load(html)
  $('table.table > tbody > tr').each(function () {
    const el = $(this).find('td')
    if (/tidak|no/i.test(el.eq(1).text())) {
      const quality = el.eq(0).text().split('(')?.[0]?.trim()
      const url = el.eq(2).find('a[href]').attr('href')
      if (url) result.push({ quality, url })
    }
  })
  if (!result.length) throw new ScraperError(`Can't download!\n${$.html()}`)

  const data = {
    id: $('div.media-content > div.content > p > strong')
      .text()
      .split('#')?.[1]
      ?.trim() || '',
    title: $('div.media-content > div.content > p > strong').text(),
    description: $('div.media-content > div.content > p > span.video-des').text(),
    thumbnail: $('figure > p.image > img[src]').attr('src') as string,
    result
  }
  return FacebookDownloaderV2Schema.parse(data)
}

export async function facebookdlv3 (url: string): Promise<FacebookDownloaderV3> {
  FacebookDownloaderArgsSchema.parse(arguments)

  const payload = {
    url
  }
  const text = await got('https://www.getfvid.com/downloader', {
    method: 'POST',
    headers: {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/x-www-form-urlencoded',
      cookie: '_ga=GA1.2.887753826.1642391325; _gid=GA1.2.2022692773.1642391325; __gads=ID=4ea88e3817c8d71b-22332defffcf0045:T=1642391326:RT=1642391326:S=ALNI_MY3oJyiEG_b8KXZBJ7RqvN2Mn8wbw; XSRF-TOKEN=eyJpdiI6ImdNUElWWU83S01jOTdZeitCUWdkWXc9PSIsInZhbHVlIjoiTGxnaE9oRVJTKzA5NDBncUtBa0xEdCtqNHBJXC9ZMVFPR1U2RnBSYUFzZHltWElZS2VtVUltUTJ2TjB5V3pEeTYzRUNMcENjMURGSkhBXC9OUitpcjMrZz09IiwibWFjIjoiMTViZTNjZDI3ZTZmOTk2ZWRjOWM1NTA5MTU2NDFhYWFlMjIxNTQxZTJlYjliMjJiMzE3YzlkNGMxODc2NjhmMCJ9; laravel_session=eyJpdiI6IjhZbElIRmpLSkVqZGZpQXJoK2MzVHc9PSIsInZhbHVlIjoianBSSFhPb2t0RFY4Q1wvYkk1S3pxMUNxXC82b0U1NHZROTVpS1Z4dGhES3ZTYTNsenJUSXpwcWNMVDkwWFk4OUY1TitGNmlDK1RXbTVyREVzcHVoRnRidz09IiwibWFjIjoiY2U1YzI2ODZlYWI2NzFkZDU1NTQ5Zjk0M2NmMDc2MTZhY2M3ODQxYjljZGUzMDQwMTYxZGQwZGYxMDM3NDMyZSJ9; __cf_bm=ephRNXRqwgrTB4SmHlsudy886EfsR2Ns2KtXVBnph4I-1642392732-0-AXtTUW5HRNQUeUcTJPhJTOPlMcjBFmMyoLKYOnxrDZ6Fa06XaJ4pMNW9arLg4zco/ef+ji00IV8NZb0nGOAKgfg=; _gat=1; __atuvc=6%7C3; __atuvs=61e4e71d2b803588005; __atssc=google%3B3',
      origin: 'https://www.getfvid.com',
      referer: 'https://www.getfvid.com/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
    },
    form: payload
  }).text()
  const $ = cheerio.load(text)
  const row = $('div.card > div.row > div')
  const thumbnail: string | undefined = /background-image: url\((.*?)\);/i.exec(
    row.eq(0).find('a[href]').attr('style') as string
  )?.[1]
  const result: FacebookDownloaderV3['result'] = []
  row.find('.btns-download > p > a[href]').each(function () {
    const el = $(this)
    const url = el.attr('href')
    const info = el.text().trim()
    const isAudio = /audio/i.test(info)
    const quality = isAudio ? 'audio' : /Download in (\w+) Quality/i.exec(info)?.[1]
    const isVideo = quality !== 'audio'
    if (url) {
      result.push({
        url,
        quality,
        isAudio,
        isVideo
      })
    }
  })
  if (!result.length) throw new ScraperError(`Can't download!\n${$.html()}`)

  const res = {
    title: $('#title_video').val() as string,
    thumbnail,
    result
  }
  return FacebookDownloaderV3Schema.parse(res)
}
