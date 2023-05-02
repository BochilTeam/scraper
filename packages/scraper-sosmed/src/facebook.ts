import cheerio from 'cheerio'
import got from 'got'
import {
  decodeSnapApp,
  getDecodedSnapSave,
  getEncodedSnapApp,
  generateTokenYoutube4kdownloader
} from '../utils/index.js'
import {
  FacebookDownloaderArgsSchema,
  FacebookDownloaderSchema,
  FacebookDownloader,
  FacebookDownloaderV2Schema,
  FacebookDownloaderV2,
} from '../types/index.js'

export interface Video {
  ext: string
  url: string
  quality: string
  size: string
  fid: string
  vcodec?: string
  fps?: string
  hdr?: string
}

export interface Audio {
  size: any
  ext: string
  url: string
  quality: string
  vcodec: string
  fps: string
  hdr: string
  fid: string
  audioTrack: AudioTrack
  acodec: string
  asr: number
  abr?: string
}

export interface AudioTrack {
  id: string
  displayName: string
}

export interface Webm {
  size: number
  ext: string
  url: string
  quality: string
  vcodec: string
  fps: string
  hdr: string
  fid: string
}


// only support download video yet
export async function facebookdl (url: string): Promise<FacebookDownloader> {
  FacebookDownloaderArgsSchema.parse(arguments)

  const {
    data: { id, thumbnail, duration, title, a, av, v }
  }: {
    data: {
      id: string;
      thumbnail: string;
      title: string;
      duration: number;
      a: Audio[];
      av: Video[];
      v: Webm[];
    };
  } = await got('https://s4.youtube4kdownloader.com/ajax/getLinks.php', {
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'Content-type': 'application/x-www-form-urlencoded',
      Host: 's4.youtube4kdownloader.com',
      Origin: 'https://youtube4kdownloader.com',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
    },
    searchParams: {
      video: url,
      rand: generateTokenYoutube4kdownloader(url)
    }
  }).json()

  const result: FacebookDownloader['result'] = [...a, ...av, ...v]
    .map(({ size, ext, url, quality, vcodec, fid }) => {
      const isVideo = ext === 'mp4'
      const isWebm = ext === 'webm'
      const isAudio = ext === 'mp3'
      return {
        size,
        ext,
        url,
        quality,
        vcodec,
        fid,
        isVideo: isVideo || isWebm,
        isAudio: isAudio
      }
      // ext webm video without audio
    })
  if (!result.length) throw new Error(`Can't download!\n${JSON.stringify({ id, thumbnail, duration, a, av, v }, null, 2)}`)

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
    html = getDecodedSnapSave(decodeSnapApp(...decodeParams))
  }
  if (!html) throw new Error(`Can't parse encode params!\n${res}`)
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
  if (!result.length) throw new Error(`Can't download!\n${$.html()}`)

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
