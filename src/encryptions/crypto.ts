import crypto from 'crypto'

export function randomUUID(opts: { disableEntropyCache: boolean }) {
    return crypto.randomUUID(opts)
}

export function randomBytes(size: number) {
    return crypto.randomBytes(size).toString('hex')
}

export function createHash(algorithm: string /* 'md4' | 'md5' | 'sha1' | 'sha256' | 'sha512 */ , data: crypto.BinaryLike) {
    return crypto.createHash(algorithm).update(data).digest('hex')
}