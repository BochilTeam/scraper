import got from 'got'
import vm from 'vm'
import { DEFAULT_HEADERS } from './constant.js'
import { generateHash } from './util.js'
import {
    SavefromArgsSchema,
    SavefromSchema
} from '../types/savefrom.js'

export default async function savefrom (url: string) {
    SavefromArgsSchema.parse(arguments)

    const form = {
        sf_url: url,
        sf_submit: '',
        new: '2',
        lang: 'en',
        app: '',
        country: 'en',
        os: 'Windows',
        browser: 'Chrome',
        channel: 'main',
        'sf-nomad': '1',
        url,
        ts: Date.now(),
        _ts: 1695977397919,
        _tsc: 0,
        _s: generateHash(url),
        _x: 0
    }
    const data = await got.post('https://worker.savefrom.net/savefrom.php', {
        headers: {
            ...DEFAULT_HEADERS,
            'content-type': 'application/x-www-form-urlencoded',
            origin: 'https://en.savefrom.net',
            referer: 'https://en.savefrom.net/'
        },
        form
    }).text()
    const executeCode = '[]["filter"]["constructor"](b).call(a);'
    if (data.indexOf(executeCode) === -1) {
        console.error(data)
        throw new Error('Cannot find executable code!')
    }
    const script = data.replace(executeCode, `
try {const script = ${executeCode.split('.call')[0]}.toString();if (script.includes('function showResult')) results = script;else (${executeCode.replace(/;/, '')});} catch {}
`.trim())
    const context: { results: string | null } = {
        results: null,
    }
    vm.createContext(context)
    new vm.Script(script).runInContext(context)
    const executed = context.results!.split('window.parent.sf.videoResult.show(')?.[1]
        || context.results!.split('window.parent.sf.videoResult.showRows(')?.[1]
    if (!executed) {
        console.error(executed, script)
        throw new Error('Cannot find result data from evaluation!')
    }

    let json
    try {
        if (context.results!.includes('showRows')) {
            const splits = executed.split('],"')
            const lastIndex = splits.findIndex(v => v.includes('window.parent.sf.enableElement'))
            json = JSON.parse(splits.slice(0, lastIndex).join('],"') + ']')
        } else {
            json = [JSON.parse(executed.split(');')[0])]
        }
    } catch (e) {
        console.error(e, executed)
        throw new Error('Cannot parse results data from evaluation!')
    }
    return SavefromSchema.parse(json)
}