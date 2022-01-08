import fetch from "node-fetch";
import cheerio from "cheerio"

interface Iresfacebookdl {
    id: string,
    thumbnail: string,
    duration: number,
    result: {
        size?: string,
        ext: string,
        url: string,
        quality: string,
        vcodec?: string,
        fid: string,
        isVideo: boolean,
        isAudio: boolean,
    }[]
}

interface Ires {
    size?: string,
    ext: string,
    url: string,
    quality?: string
    vcodec?: string,
    fid: string,
}

// only support download video yet
export async function facebookdl(url: string): Promise<Iresfacebookdl> {
    // https://fb.watch/9V3JrKcqHi/
    const res = await fetch(`https://youtube4kdownloader.com/ajax/getLinks.php?video=${encodeURIComponent(url)}&rand=a95ce6c6be8b6`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        }
    })
    const { data: { id, thumbnail, duration, a, av, v } }: {
        data: {
            id: string, thumbnail: string, duration: number, a: Ires[], av: Ires[], v: Ires[]
        }
    } = await res.json()
    const result: Iresfacebookdl['result'] = a.concat(av).concat(v).map(({ size, ext, url, quality, vcodec, fid }) => {
        let isVideo = ext === 'mp4'
        let isWebm = ext === 'webm'
        return {
            size,
            ext,
            url,
            quality,
            vcodec,
            fid,
            isVideo: isVideo || isWebm,
            isAudio: /audio/i.test(quality) || (isVideo && !isWebm)
        }
        // ext webm video without audio
    })
    return {
        id, thumbnail, duration, result
    }
}

interface Iresfacebookdlv2 {
    id: string,
    thumbnail: string,
    result: {
        quality: string, url: string
    }[]
}

export async function facebookdlv2(url: string): Promise<Iresfacebookdlv2> {
    const params: { url: string } = {
        url: url,
    }
    const res = await fetch('https://snapsave.app/action.php?lang=id', {
        method: 'POST',
        headers: {
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/x-www-form-urlencoded',
            cookie: 'PHPSESSID=8bp3pmf9b22vm9ihvuv6pn1h3d; current_language=id; _ga=GA1.2.5314845.1641630867; _gid=GA1.2.1966536698.1641630867; _gat=1; __gads=ID=66279abc1ad9d914-226d4524bccf00f8:T=1641630868:RT=1641630868:S=ALNI_MbL7LSCkGI6VwO33W7V6VkOozebNg; __atuvc=1%7C1; __atuvs=61d94c9354d617a5000; __atssc=google%3B1',
            origin: 'https://snapsave.app',
            referer: 'https://snapsave.app/id',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
        },
        body: new URLSearchParams(Object.entries(params))
    })
    let result: Iresfacebookdlv2['result'] = []
    const $ = cheerio.load((await res.json()).data as string)
    $('table.table > tbody > tr').each(function () {
        const el = $(this).find('td')
        if (/tidak/i.test(el.eq(1).text())) {
            const quality = el.eq(0).text().split('(')?.[0]?.trim()
            const url = el.eq(2).find('a[href]').attr('href')
            result.push({ quality, url })
        }
    })
    return {
        id: $('div.media-content > div.content > p > strong').text().split('#')?.[1]?.trim(),
        thumbnail: $('figure > p.image > img[src]').attr('src'),
        result
    }
}