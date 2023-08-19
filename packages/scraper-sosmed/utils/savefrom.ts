import * as crypto from 'crypto'

const hashed = "1aa25e742304cfd938350f98c41dfdb5546d8bbc4bfb78dd92b9061e039d69a3"

export function generateHash (url: string) {
    const data = url + Date.now() + hashed
    const hash = crypto.createHash('sha256')
    hash.update(data)
    return hash.digest('hex')
}

export function generateSavefromParams (url: string) {
    const ts = Date.now()
    const _tsc = 0
    const _s = generateHash(url)
    return {
        ts,
        _ts: 1692292847625,
        _tsc,
        _s
    }
}