import cheerio from 'cheerio'
import got from 'got'
import FormData from 'form-data'
import {
  YoutubeDownloader,
  YoutubeVideoOrAudio,
  YoutubeDownloaderArgsSchema,
  YoutubeDownloaderSchema,
  YoutubeDownloaderV2ArgsSchema,
  YoutubeConvertSchema
} from '../types/index.js'
import { sizeFormatter } from 'human-readable'
import { parseFileSize } from '../utils/index.js'

const toFormat = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`
})


// https://github.com/BochilGaming/games-wabot/blob/main/lib/y2mate.js
const servers = ['en', 'id', 'es']
/**
 * Scrape from https://www.y2mate.com/
 */
export async function youtubedl (
  url: string,
  server: string = servers[0]
): Promise<YoutubeDownloader> {
  YoutubeDownloaderArgsSchema.parse(arguments)

  if (!servers.includes(server)) server = servers[0]
  const json: {
    status: string
    mess: string
    page: string
    vid: string
    extractor: string
    title: string
    t: number
    a: string
    links: {
      [Type: string]: {
        [Key: string]: {
          size: string
          f: string
          q: string
          q_text: string
          k: string
        }
      }
    }
    related: {
      title: string
      contents: {
        v: string
        t: string
      }[]
    }[]
  } = await got
    .post(`https://www.y2mate.com/mates/analyzeV2/ajax`, {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        cookie:
          '_gid=GA1.2.2055666962.1683248123; _gat_gtag_UA_84863187_21=1; _ga_K8CD7CY0TZ=GS1.1.1683248122.1.1.1683249010.0.0.0; _ga=GA1.1.1570308475.1683248122',
        origin: 'https://www.y2mate.com',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      },
      form: {
        k_query: url,
        k_page: 'home',
        hl: server,
        q_auto: 0 // maybe in the future this will cause an error?
      }
    })
    .json()

  const vid = json.vid

  const video: YoutubeVideoOrAudio = {}
  const audio: YoutubeVideoOrAudio = {}
  for (const videoKey in json.links['mp4']) {
    const _video = json.links['mp4'][videoKey]
    const quality = _video.q
    if (_video.f !== 'mp4') continue
    const fileSizeH = _video.size
    const fileSize = parseFileSize(fileSizeH)
    video[quality] = {
      quality,
      fileSizeH,
      fileSize,
      download: convert.bind(convert, vid, _video.k)
    }
  }
  for (const audioKey in json.links['mp3']) {
    const _audio = json.links['mp3'][audioKey]
    const quality = _audio.q
    if (_audio.f !== 'mp3') continue
    const fileSizeH = _audio.size
    const fileSize = parseFileSize(fileSizeH)
    audio[quality] = {
      quality,
      fileSizeH,
      fileSize,
      download: convert.bind(convert, vid, _audio.k)
    }
  }

  const res = {
    id: vid,
    thumbnail: `https://i.ytimg.com/vi/${vid}/0.jpg`,
    title: json.title,
    duration: json.t,
    video,
    audio
  }
  return YoutubeDownloaderSchema.parse(res)
}

interface IresLinks {
  f: string;
  k: string;
  key: string;
  q: string;
  selected?: string;
  size: string;
}

export async function youtubedlv2 (url: string): Promise<YoutubeDownloader> {
  YoutubeDownloaderV2ArgsSchema.parse(arguments)

  const html = await got('https://yt5s.io/').text()
  const urlAjax = (/k_url_search="(.*?)"/.exec(html) || ['', ''])[1]
  const vt = (/k_page='(.*?)'/.exec(html) || ['', ''])[1]
  const urlConvert = (/k_url_convert="(.*?)"/.exec(html) || ['', ''])[1]
  const json: {
    vid: string;
    title: string;
    a: string;
    token: string;
    timeExpires: string;
    fn: string;
    links: {
      [Key: string]: {
        [Key: string]: IresLinks;
      };
    };
  } = await got(urlAjax, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      origin: 'https://yt5s.io',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
    },
    form: {
      q: url,
      vt
    }
  }).json()
  console.log(json)
  const video: YoutubeVideoOrAudio = {}
  Object.values(json.links.mp4).forEach(({ k, size }: IresLinks) => {
    video[k] = {
      quality: k,
      fileSizeH: size,
      fileSize: parseFloat(size) * (/MB$/.test(size) ? 1000 : 1),
      // @ts-ignore
      download: convertv2.bind(
        null,
        urlConvert,
        json.vid,
        'mp4',
        k,
        json.token,
        parseInt(json.timeExpires),
        json.fn
      )
    }
  })
  const audio: YoutubeVideoOrAudio = {}
  Object.values(json.links.mp3).forEach(({ key, size }: IresLinks) => {
    audio[key] = {
      quality: key,
      fileSizeH: size,
      fileSize: parseFloat(size) * (/MB$/.test(size) ? 1000 : 1),
      // @ts-ignore
      download: convertv2.bind(
        null,
        urlConvert,
        json.vid,
        'mp3',
        key.replace(/kbps/i, ''),
        json.token,
        parseInt(json.timeExpires),
        json.fn
      )
    }
  })

  const res = {
    id: json.vid,
    title: json.title,
    thumbnail: `https://i.ytimg.com/vi/${json.vid}/0.jpg`,
    video,
    audio
  }
  return YoutubeDownloaderSchema.parse(res)
}

export async function convert (
  vid: string,
  k: string
): Promise<string> {
  const json: {
    status: string
    mess: string
    c_status: string
    vid: string
    title: string
    ftype: string
    fquality: string
    dlink: string
  } = await got('https://www.y2mate.com/mates/convertV2/index', {
    method: 'POST',
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      cookie:
        '_gid=GA1.2.2055666962.1683248123; _ga=GA1.1.1570308475.1683248122; _ga_K8CD7CY0TZ=GS1.1.1683248122.1.1.1683248164.0.0.0; prefetchAd_3381349=true',
      origin: 'https://www.y2mate.com',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
    },
    form: {
      vid,
      k
    }
  }).json()
  return YoutubeConvertSchema.parse(json.dlink)
}

export async function convertv2 (
  url: string,
  v_id: string,
  ftype: string,
  fquality: string,
  token: string,
  timeExpire: number,
  fname: string
) {
  console.log({
    v_id,
    ftype,
    fquality,
    token,
    timeExpire,
    client: 'yt5s.io'
  })

  const form = new FormData()
  form.append('v_id', v_id)
  form.append('ftype', ftype)
  form.append('fquality', fquality)
  form.append('token', token)
  form.append('timeExpire', timeExpire)
  form.append('client', 'yt5s.io')

  const json = await got.post(url, {
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      origin: 'https://yt5s.io',
      referer: 'https://yt5s.io/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      'X-Requested-Key': 'de0cfuirtgf67a'
    },
   json: {
    v_id,
    ftype,
    fquality,
    token,
    timeExpire,
    client: 'yt5s.io'
  }
  }).json<{
    c_server: string
    c_status: string
  }>()
  console.log({ json })
  if (json.c_status !== 'ok') {
    throw new Error(`Error in converting!. Got ${JSON.stringify(json)}`)
  }
  const json2 = await got.post(`${json.c_server}/api/json/convert`, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      origin: 'https://yt5s.io',
      referer: 'https://yt5s.io/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    },
    form: {
      v_id,
      ftype,
      fquality,
      fname,
      token,
      timeExpire
    }
  })
  console.log({ json2 })
  return json2
}
