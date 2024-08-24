import got from 'got'
import * as cheerio from 'cheerio'
import FormData from 'form-data'
import { SnapSave, SnapSaveArgsSchema, SnapSaveSchema } from '../types/snapsave.js'
import { DEFAULT_HEADERS } from './constant.js'
import { decryptSnapSave } from './util.js'

export default async function snapsave(url: string) {
    SnapSaveArgsSchema.parse(arguments)

    const form = new FormData()
    form.append('url', url)

    const code = await got.post('https://snapsave.app/action.php?lang=en', {
        headers: {
            ...DEFAULT_HEADERS,
            ...form.getHeaders(),
            // 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryPB8muY50KZ4V50Zn',
            // cookie: '_ga=GA1.1.1558872462.1720930856; _cc_id=2d99f412434e5d8cbda03337aa35ee4f; panoramaId_expiry=1721017258226; panoramaId=0fbd237b1c83a97b5d9b0a2e74e8a9fb927adf20d120e77c3d258fa74e40d97c; panoramaIdType=panoDevice; _pubcid=fcfb7a63-fd88-43d6-a800-2d325ba7501a; _pubcid_cst=zix7LPQsHA%3D%3D; __jscuActive=true; __gads=ID=74022a0a94813b76:T=1720930855:RT=1720962727:S=ALNI_MbowTCJVh8qWSmVm00MzrAY4_1QGQ; __gpi=UID=00000e90ae55ce16:T=1720930855:RT=1720962727:S=ALNI_MbUiWNbuhLddtGra_jdUHgd1ZL_FQ; __eoi=ID=c9050160a2133cb9:T=1720930855:RT=1720962727:S=AA-AfjZuo4WGGeAoJVLmXkedofv_; FCNEC=%5B%5B%22AKsRol_by0C6RelpmA96kD3fwyVpAW8vDtC8rJK1SRGMVvPatLAFI9S8fBWGHiYhlU4hUNZQdCkStJ_1dS4jhkkaYNjg3-yRx3l6HdZwQwG2AflGqCy-S80hOo4l1sfP7Bl6-tcaZAVSfaKJs_czfWB75SlW0T7-Mg%3D%3D%22%5D%5D; _ga_WNPZGVDWE9=GS1.1.1720962726.2.1.1720962798.60.0.0',
            origin: 'https://snapsave.app',
            referer: 'https://snapsave.app/en'
        },
        body: form.getBuffer()
    }).text()

    const decode = decryptSnapSave(code)
    const $ = cheerio.load(decode)
    const results: (SnapSave['results'][number] & { shouldRender?: boolean })[] = []

    const title = $('.content > p > strong').text() || undefined
    const description = $('span.video-des').text() || undefined
   
    if ($('div.download-items').length) {
        $('div.download-items').each((_, el) => {
            const $el = $(el)
            const url = $el.find('.download-items__btn > a').attr('href')!
            const thumbUrl = new URL($el.find('.download-items__thumb > img').attr('src')!)
            const thumb = thumbUrl.searchParams.get('photo') || thumbUrl.toString()
            results.push({
                thumbnail: thumb,
                url
            })
        })
    } else if ($('table.table').length) {
        const thumbnail = $('figure > .image > img').attr('src') || undefined
        $('tbody > tr').each((_, el) => {
            const $el = $(el)
            const $td = $el.find('td')
            const resolution = $td.eq(0).text()
            let _url = $td.eq(2).find('a').attr('href') || $td.eq(2).find('button').attr('onclick')
            const shouldRender = /get_progressApi/ig.test(_url || '')
            if (shouldRender) {
                _url = /get_progressApi\('(.*?)'\)/.exec(_url || '')?.[1] || _url
            }
            results.push({
                resolution,
                thumbnail,
                url: _url!,
                shouldRender
            })
        })
    } else {
        const thumbnail = $('figure > .image > img').attr('src')!
        const url = $('div.column > a').attr('href')!
        results.push({
            thumbnail,
            url
        })
    }  

    const result = {
        title,
        description,
        results
    }
    
    return SnapSaveSchema.parse(result)
}