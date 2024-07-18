import { createHmac } from 'crypto'

const SECRET = '96dea4bfb6afcbcc28c7f6080afe7435'

export function generateMusixmatchHash(url: string) {
    const d = new Date()
    const year = d.getUTCFullYear().toString()
    const month = serializeDate(d.getUTCMonth() + 1)
    const date = serializeDate(d.getUTCDate())

    const hmac = createHmac('sha256', SECRET);
    hmac.update(url + year + month + date);
    return hmac.digest('base64')
}

export function serializeDate(d: number) {
    const repetition = 2
    return ("0".repeat(repetition) + d).slice(-repetition)
}