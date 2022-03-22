import got from 'got'
import vm from 'vm'
import { ScraperError } from '../utils.js'
// eslint-disable-next-line import/extensions
import { Savefrom } from './types'

export default async function savefrom (url: string): Promise<Savefrom> {
  let scriptJS = await got('https://worker.sf-tools.com/savefrom.php', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      origin: 'https://id.savefrom.net',
      referer: 'https://id.savefrom.net/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36'
    },
    form: {
      sf_url: encodeURI(url),
      sf_submit: '',
      new: 2,
      lang: 'id',
      app: '',
      country: 'id',
      os: 'Windows',
      browser: 'Chrome',
      channel: ' main',
      'sf-nomad': 1
    }
  }).text()
  const executeCode = '[]["filter"]["constructor"](b).call(a);'
  if (scriptJS.indexOf(executeCode) === -1) throw new ScraperError(`Cannot find execute code\n${scriptJS}`)
  scriptJS = scriptJS.replace(executeCode, `
try {
  i++;
  if (i === 2) scriptResult = ${executeCode.split('.call')[0]}.toString();
  else (
    ${executeCode.replace(/;/, '')}
    );
} catch {}
`)
  const context = {
    scriptResult: '',
    i: 0
  }
  vm.createContext(context)
  new vm.Script(scriptJS).runInContext(context)
  const json = JSON.parse(context.scriptResult.split('window.parent.sf.videoResult.show(')?.[1].split(');')?.[0])
  return json
}
