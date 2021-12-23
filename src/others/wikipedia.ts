import fetch from 'node-fetch'
import cheerio from 'cheerio'

interface result {
    title: string;
    img: string;
    articles: string;
}

export default async function wikipedia(query: string, lang: 'en' | 'id' = 'id'): Promise<result> {
    const html = await getHtml(lang, query)
    const $ = cheerio.load(html)
    const title = $('#firstHeading > i').text().trim()
    let img = getImgLink($('td.infobox-image > a.image > img[src]').attr('src'))
    let articles: string[] = []
    let end = false, start = false
    $('#mw-content-text > div.mw-parser-output').children().map(function () {
        if (/p|h[2-4]|div/.test(this.name) && !end) {
            let text = ''
            let h = /h[2-4]/.test(this.name)
            let div = /div/.test(this.name)
            let el = $(this)
            if (h && /referen|Примечания|Notes_et_références/i.test(el.find('span.mw-headline').attr('id'))) return end = true
            let math = $(this).find('span.mwe-math-element')
            if (math.length) math.replaceWith($(`<span>${math.text().trim().replace(/(.*displaystyle.*|\\n)/, '')}</span>`))
            if (div && el.hasClass('thumb') && el.find('div.thumbinner > a > img[src]').length) text = getImgLink(el.find('div.thumbinner > a > img[src]').attr('src'))
            else if (div && el.find('div > ol > li[id]').length) el.find('div > ol > li[id]').each(function () {
                text += $(this).text().trim() + '\n'
            })
            else text = el.text().trim()
            if (!start && this.name == 'p' && !end && text) start = true
            if (text && start && !el.find('div > ul > li').length) articles.push(
                (h ? '\n' : '') +
                text
            )
        }
    })

    return {
        title,
        img,
        articles: articles.join('\n\n')
    } as result
}

function isSupportLang(lang: string): boolean {
    return ['en', 'id'].includes(lang)
}

async function getHtml(lang: string, query: string): Promise<string> {
    query = encodeURIComponent(query.trim())
    const defaultLink = `https://${isSupportLang(lang) ? lang : 'id'}.wikipedia.org`
    let res = await fetch(defaultLink + '/wiki/' + query)
    if (!(res.status == 404)) return await res.text()
    const link = `${defaultLink}/w/index.php?${lang == 'id' ? `title=Istimewa:Pencarian&search=${query}&fulltext=1&ns0=1` : `search=${query}&title=Special:Search&profile=advanced&fulltext=1&ns0=1`}`
    res = await fetch(link)
    let html = await res.text()
    const $ = cheerio.load(html)
    let results: string[] = []
    $('ul.mw-search-results > li.mw-search-result').each(function () {
        let link = $(this).find('div.mw-search-result-heading > a[href]').attr('href')?.trim()
        if (link) results.push(encodeURI(link))
    })
    if (results[0]) return await (await (fetch(defaultLink + results[0]))).text()
    throw '404 Not Found!!'
}

function getImgLink(link: string = ''): string {
    if (!/https:/i.test(link)) link = encodeURI('https:' + link)
    return link
}