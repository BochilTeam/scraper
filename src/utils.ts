// import { z } from 'zod'

import got from 'got'

export class ScraperError extends Error {
  readonly date: Date;
  constructor (message: any, options?: {}) {
    super(message)
    this.name = 'ScraperError'
    this.date = new Date()
    this.message =
      message +
      '\n\nIf this is bug pls report to https://github.com/BochilTeam/scraper'
  }

  static createError (message: any, options?: {}): ScraperError {
    return new ScraperError(message, options)
  }

  static createErrorArgs (message: any, options?: {}): ScraperError {
    return new ScraperError('Invalid input args: ' + message, options)
  }
}

export function getEncodedSnapApp (data: string): string[] {
  return data.split('decodeURIComponent(escape(r))}(')[1]
    .split('))</script>')[0]
    .split(',')
    .map(v => v.replace(/"/g, '').trim())
}

export function decodeSnapApp (...args: string[] | number[]): string {
  // From reponse snap app
  function _0xe78c (
    d: string,
    e: number,
    f: number
  ): string {
    const g = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('')
    const h = g.slice(0, e)
    const i = g.slice(0, f)
    // @ts-ignore
    // eslint-disable-next-line array-callback-return
    let j = d.split('').reverse().reduce(function (a, b, c) {
      // eslint-disable-next-line no-return-assign
      if (h.indexOf(b) !== -1) return a += h.indexOf(b) * (Math.pow(e, c))
    }, 0) as number
    let k = ''
    while (j > 0) {
      k = i[j % f] + k
      j = (j - (j % f)) / f
    }
    return k || '0'
  }

  function _0xc60e (
    h: string,
    u: number,
    n: string,
    t: number,
    e: string | number,
    r: string
  ) {
    r = ''
    for (let i = 0, len = h.length; i < len; i++) {
      let s = ''
      while (h[i] !== n[e as number]) {
        s += h[i]
        i++
      }
      for (let j = 0; j < n.length; j++) {
        s = s.replace(new RegExp(n[j], 'g'), j.toString())
      }
      // @ts-ignore
      r += String.fromCharCode((_0xe78c(s, e, 10) - t) as number[])
    }
    return decodeURIComponent(encodeURIComponent(r))
  }
  // @ts-ignore
  return _0xc60e(...args)
}

export function getDecodedSnapSave (data: string): string {
  return data.split('"download-section").innerHTML = "')[1]
    .split('"; parent.document.getElementById("inputData").remove();')[0]
    .replace(/\\(\\)?/g, '')
}

export function decryptSnapSave (data: string): string {
  return getDecodedSnapSave(decodeSnapApp(...getEncodedSnapApp(data)))
}

type JsonRenderedSnapSave = {
  status: number,
  data: {
    identifier: string;
    progress: number;
    file_size: number;
    file_path: string;
  }
}
type RenderedSnapSave = Omit<JsonRenderedSnapSave['data'], 'identifier' | 'progress'>
export async function getRenderedSnapSaveUrl (url: string): Promise<RenderedSnapSave> {
  while (true) {
    const json = await got(url).json<JsonRenderedSnapSave>()
    if (json.status !== 1) throw new ScraperError(json.data.identifier)
    if (json.data.progress === 100) {
      return {
        file_size: json.data.file_size,
        file_path: json.data.file_path
      }
    }
  }
}

export function stringifyCookies (cookies: string[]): string {
  return cookies.map(cookie => {
    const [name, _value] = cookie.split('=')
    const [value] = _value.split(';')
    return `${name}=${value}`
  }).join('; ')
}

export function parseCookies (cookieString: string): { [key: string]: string } {
  const cookies: { [key: string]: string } = {}
  cookieString.split(';').forEach(cookie => {
    const [key, value] = cookie.split('=')
    cookies[key.trim()] = value.trim()
  })
  return cookies
}

/**
 * @returns is a kilobit
 */
export function parseFileSize (size: string): number {
  return parseFloat(size) * (
    /GB/i.test(size)
      ? 1000000
      : /MB/i.test(size)
        ? 1000
        : /KB/i.test(size)
          ? 1
          : /bytes?/i.test(size)
            ? 0.001
            : /B/i.test(size)
              ? 0.1
              : 0
  )
}

// // https://github.com/microsoft/TypeScript/issues/13298#issuecomment-885980381
// type UnionToIntersection<U> = (
//   U extends never ? never : (arg: U) => never
// ) extends (arg: infer I) => void
//   ? I
//   : never;
// type UnionToTuple<T> = UnionToIntersection<
//   T extends never ? never : (t: T) => T
// > extends (_: never) => infer W
//   ? [...UnionToTuple<Exclude<T, W>>, W]
//   : [];

// export function zodObjectToZodTuples<T extends ReturnType<typeof z.object>> (obj: T): z.ZodTuple<UnionToTuple<T['_shape'][keyof T['_shape']]>> {

// }
