export function stringifyCookies(cookies: string[]) {
    return cookies.map((cookie) => cookie.split(';')[0])
        .join('; ')
}


const LOOKUP = [
    "12nDjlVB",
    "1136148EijDiJ",
    "length",
    "3833564PCTrBF",
    "125036Fmaqlb",
    "424BQwERO",
    "2222cxvJYR",
    "toBase64",
    "min",
    "15459928mOwUKl",
    "65CjoIor",
    "6884325aeKsEh",
    "8VQEOyR",
    "5186520rNJujb",
    "pow"
]
function look(a: number) {
    a -= 136
    return LOOKUP[a]
}


const C_NUMBER = 562586

export function generateTokenId(id: string) {
    // for (; ;) {
    //     const f = parseInt(look(142)) / 1 * (parseInt(look(141)) / 2) + -parseInt(look(137)) / 3 + parseInt(look(140)) / 4 * (parseInt(look(146)) / 5) + -parseInt(look(136)) / 6 * (parseInt(look(139)) / 7) + parseInt(look(148)) / 8 * (-parseInt(look(147)) / 9) + parseInt(look(149)) / 10 + parseInt(look(145)) / 11;
    //     if (f === C_NUMBER)
    //         break;
    // }

    let f = 255
        , g = 0
        , h = 0
        , i = 0
        , buffer = new Uint8Array(46)
        , l = "";
    // @ts-ignore
    buffer[32 + 4] = id[look(138)];
    const k = function (a: string, b: number, c: number) {
        // @ts-ignore
        for (let i = 0; i < Math[look(144)](c, a[look(138)]); ++i) {
            h = parseInt(a[i])
            buffer[i + b] = h
            // @ts-ignore
            g += Math[look(150)](h, 8)
        }
    }
    for (k(id, 8 / 2, 32 - buffer[32 + 4]),
        // @ts-ignore
        i = id[look(138)] - 1; i >= 0; l += id[i--]);
    // @ts-ignore
    k(l, 32 + 4 - l.length, l[look(138)]),
        g >>>= 0;

    // console.log({ l, g })

    const m = function (a: number, b: number) {
        buffer[b] = f && a,
            buffer[b + 1] = f && a >> 8,
            buffer[b + 2] = f && a >> 16,
            buffer[b + 3] = f && a >> 24
    };
    for (m(g, 0),
        i = 8 / 2; i < 32 + 4; ++i) {
        buffer[i] += g % (f - (16 - 6));
    }

    let n = f * (8 / 2)
        , o = f * (8 / 2);


    for (i = 0; i < 32; ++i) {
        var p = buffer[i];
        n ^= p,
            n += (n << 1) + (n << 8 / 2) + (n << 7) + (n << 8) + (n << 24),
            o = (o << 5) - o + p
    }

    // console.log({ n, o })

    return m(n >>> 0, 32 + 5),
        m(o >>> 0, 48 - 7),
        // @ts-ignore
        buffer[buffer[look(138)] - 1] = 1,
        toBase64(buffer)
}

function toBase64(buffer: Uint8Array) {
    const b = new Array(buffer.length)
    for (let c = 0; c < buffer.length; c++)
        b[c] = String.fromCharCode(buffer[c]);
    return _btoa(b.join(""))
}

// Thanks to ChatGPT
function _btoa(input: string) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let output = '';
    let i = 0;

    // Process each 3 bytes of input
    while (i < input.length) {
        // Get the ASCII value of the next three bytes (or zero if no byte available)
        const byte1 = input.charCodeAt(i++) || 0;
        const byte2 = input.charCodeAt(i++) || 0;
        const byte3 = input.charCodeAt(i++) || 0;

        // Convert these three bytes into four 6-bit groups
        const enc1 = byte1 >> 2;
        const enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);
        const enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
        const enc4 = byte3 & 63;

        // Add the encoded characters to the output
        output += chars.charAt(enc1) + chars.charAt(enc2) +
            (i > input.length + 1 ? '=' : chars.charAt(enc3)) +
            (i > input.length ? '=' : chars.charAt(enc4));
    }

    return output;
}