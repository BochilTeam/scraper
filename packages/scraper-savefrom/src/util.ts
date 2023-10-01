import crypto from 'crypto'

const hashed = "fe72c5ca495558be535f81cb175ecab8536889752abd6a2512b9b84ce26f2c81"

export function generateHash (url: string) {
    const data = url + Date.now() + hashed
    const hash = crypto.createHash('sha256')
    hash.update(data)
    return hash.digest('hex')
}