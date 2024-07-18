import crypto from 'crypto'

const hashed = "b7944d7a59c9cb654228624880e7de59a53842c2d912b449fdf11febcf81cb21"

export function generateHash (url: string) {
    const data = url + Date.now() + hashed
    const hash = crypto.createHash('sha256')
    hash.update(data)
    return hash.digest('hex')
}