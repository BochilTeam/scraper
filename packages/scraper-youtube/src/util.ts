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

const SUFFIX = 'f24c8c73d48b7686ed11a3bf97983f6f7eb6395f19268184aae742e93683c00c'
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