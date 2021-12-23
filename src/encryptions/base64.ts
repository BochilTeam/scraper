export function toBase64(data: any): string {
    if (!Buffer.isBuffer(data)) data = Buffer.from(data)
    return data.toString('base64')
}

export function fromBase64ToString(data: string): string {
    if (/data:.*;base64,/i.test(data)) data = data.replace(/data:.*;base64,/i, '')
    return Buffer.from(data, 'base64').toString()
}