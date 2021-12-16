import cheerio from "cheerio";
import fetch from "node-fetch";

export async function twitterdl(url: string): Promise<{
    quality: string,
    type: string,
    url: string,
    isVideo: boolean
}[] | []> {
    if (!/https:\/\/twitter\.com\//i.test(url)) throw 'URL invalid!'
    const payload = {
        url,
        submit: ''
    }
    const res = await fetch('https://www.expertsphp.com/instagram-reels-downloader.php', {
        method: 'POST',
        body: new URLSearchParams(Object.entries(payload)),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            cookie: '_ga=GA1.2.783835709.1637038175; __gads=ID=5b4991618655cd86-22e2c7aeadce00ae:T=1637038176:RT=1637038176:S=ALNI_MaCe3McPrVVswzBEqcQlgnVZXtZ1g; _gid=GA1.2.1817576486.1639614645; _gat_gtag_UA_120752274_1=1',
            origin: 'https://www.expertsphp.com',
            referer: 'https://www.expertsphp.com/twitter-video-downloader.html',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
        }
    })
    const $ = cheerio.load(await res.text())
    let results = []
    $('table.table > tbody > tr').each(function () {
        const quality = $(this).find('td').eq(2).find('strong').text()
        const type = $(this).find('td').eq(1).find('strong').text()
        const url = $(this).find('td').eq(0).find('a[href]').attr('href')
        const isVideo = /video/i.test(type)
        results.push({
            quality,
            type,
            url,
            isVideo
        })
    })
    return results
}