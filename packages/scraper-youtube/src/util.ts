import crypto from 'crypto'

export function parseFileSize (size: string): number {
  const sized = parseFloat(size)
  return (isNaN(sized) ? 0 : sized) * (
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

export function stringifyCookies (cookies: string[]): string {
  return cookies.map(cookie => {
    const [name, _value] = cookie.split('=')
    const [value] = _value.split(';')
    return `${name}=${value}`
  }).join('; ')
}

const SUFFIX = 'e7dfa86d37f6e7cdf9c52d939d144713551e1f5638a04f06783223f81f556692'
export function generateHash (url: string) {
  const hash = crypto.createHash('sha256')
  const data = url + Date.now() + SUFFIX
  hash.update(data)
  return hash.digest('hex')
}

export function time2Number (time: string) {
  let [hours, minutes, seconds] = time.split(':').map(Number)
  if (!seconds) { // '00:07'
    [minutes, seconds] = [hours, minutes]
    hours = 0
  }
  return hours * 3600
    + minutes * 60
    + seconds * 1
}