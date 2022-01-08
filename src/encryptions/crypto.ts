import crypto from 'crypto'
import fetch from 'node-fetch'

export function randomUUID(opts: { disableEntropyCache: boolean }): Promise<string> | string {
    if (typeof crypto.randomUUID === 'function') return crypto.randomUUID(opts) as string
    return new Promise<string>(async (resolve) => {
        const json: string[] = await (await fetch('https://www.uuidtools.com/api/generate/v4/count/1')).json()
        return resolve(json[0])
    }) as Promise<string>
}

export function randomBytes(size: number) {
    return crypto.randomBytes(size).toString('hex')
}

export function createHash(algorithm: string /* 'md4' | 'md5' | 'sha1' | 'sha256' | 'sha512 */, data: crypto.BinaryLike) {
    return crypto.createHash(algorithm).update(data).digest('hex')
}