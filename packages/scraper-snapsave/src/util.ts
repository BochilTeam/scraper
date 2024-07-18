export function getEncodedSnapSave(data: string): string[] {
    return data.split('decodeURIComponent(escape(r))}(')[1]
        .split('))')[0]
        .split(',')
        .map(v => v.replace(/"/g, '').trim())
}

export function getDecodedSnapSave(data: string): string {
    return data.split('getElementById("download-section").innerHTML = "')[1]
        .split('"; document.getElementById("inputData").remove(); ')[0]
        .replace(/\\(\\)?/g, '')
}

export function decryptSnapSave(data: string): string {
    const args = getEncodedSnapSave(data)
    const decoded = decodeSnapSave(...args)
    return getDecodedSnapSave(decoded)
}


export function decodeSnapSave(
    ...args: string[]
) {
    let [h, u, n, t, e, r] = args
    // @ts-ignore
    function decode(d, e, f) {
        const g = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('')
        let h = g.slice(0, e)
        let i = g.slice(0, f)
        // @ts-ignore
        let j = d.split('').reverse().reduce(function (a, b, c) {
            if (h.indexOf(b) !== -1)
                return a += h.indexOf(b) * (Math.pow(e, c))
        }, 0)
        let k = ''
        while (j > 0) {
            k = i[j % f] + k
            j = (j - (j % f)) / f
        }
        return k || '0'
    }
    r = ''
    for (let i = 0, len = h.length; i < len; i++) {
        let s = ""
        // @ts-ignore
        while (h[i] !== n[e]) {
            s += h[i]; i++
        }
        for (let j = 0; j < n.length; j++)
            s = s.replace(new RegExp(n[j], "g"), j.toString())
        // @ts-ignore
        r += String.fromCharCode(decode(s, e, 10) - t)
    }
    return decodeURIComponent(encodeURIComponent(r))
}