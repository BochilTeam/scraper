# scraper

Install package
```sh
npm i @bochilteam/scraper
```

## Example use
### Instagram Downloader
```js
// Instagram Downloader
const { 
    instagramdl, 
    instagramdlv2, 
    instagramStory,
    instagramStoryv2
} = require('@bochilteam/scraper')

const url = 'https://www.instagram.com/reel/CXK49yFLtJ_/?utm_source=ig_web_copy_link'
instagramdl(url).then(console.log).catch(console.error)
instagramdlv2(url).then(console.log).catch(console.error)

// use both to handle error
instagramdl(url).catch(_ => instagramdlv2(url)).then(console.log)


// Use async/await 
console.log(await instagramdl(url).catch(console.error))
console.log(await instagramdlv2(url).catch(console.error))


// Instagram Story downloader
const username = 'freefirebgid'
const story = await instagramStory(username).catch(async _ => await instagramStoryv2(username))
console.log(story)
```
- `instagramdl` use website https://snapinsta.app, 
- `instagramdlv2` use website https://downloadgram.org
- `instagramdlv3` use website https://instasave.website
- `instagramdlv4` use website https://instadownloader.co
- `instagramStory` use website https://www.insta-stories.net
- `instagramStoryv2` use website https://www.instagramsave.com


### Youtube Downloader
```js
// Youtube downloader
const { 
    youtubedl,
    youtubedlv2 
} = require('@bochilteam/scraper')

const url = 'https://youtu.be/iik25wqIuFo'
youtubedl(url).catch(_ => youtubedlv2(url)).then(({ video }) => {
    video['240p'].download().then(console.log).catch(console.error)
})

// Use async/await 
const yt = await youtubedl(url).catch(async () => await  youtubedlv2(url))
const dl_url = await yt.video['240p'].download()
console.log(dl_url)
```
- `youtubedl` use website https://www.y2mate.com
- `youtubedlv2` use website https://yt5s.com
- `youtubedlv3` use website https://onlinevideoconverter.pro
- `youtubeSearch` use website https://www.youtube.com


### Aksara Jawa
```js
// Aksara jawa
const { 
    latinToAksara,
    aksaraToLatin
} = require('@bochilteam/scraper')

// Latin to aksara jawa
console.log(latinToAksara('hallo rek'))
// Aksara jawa to latin
console.log(aksaraToLatin('ꦲꦭ꧀ꦭꦺꦴ​ꦫꦺꦏ꧀', { HVokal: false })) // Hvokal: false mean ꦲ will return 'ha' not vokal
```
Source: https://bennylin.github.io/transliterasijawa/


### Primbons
```js
// Primbons
const { 
    getZodiac,
    nomorhoki
} = require('@bochilteam/scraper')

// Get zodiac
console.log(getZodiac(1, 1))
// Get nomor hoki
console.log(await nomorhoki(6213353))
```
- `artimimpi` use website https://www.primbon.com
- `artiname` use website https://www.primbon.com
- `nomorhoki` use website https://www.primbon.com
- `getZodiac` source: https://github.com/Nurutomo/wabot-aq/blob/master/plugins/zodiac.js


### Images
```js
// Images
const {
    googleImage,
    pinterest,
    wallpaper,
    stickerTelegram,
} = require('@bochilteam/scraper')

const keyword = 'minecraft'
// Google image
console.log(await googleImage(keyword))
// Pinterest image
console.log(await pinterest(keyword))
// Wallpaper
console.log(await wallpaper(keyword))
// Sticker telegram
console.log(await stickerTelegram(keyword))
```
- `googleImage` use website https://www.google.com
- `pinterest` use website https://www.pinterest.com
- `stickerTelegram` use website https://combot.org
- `stickerLine` use website https://store.line.me
- `wallpaper` use website https://www.shutterstock.com
- `wallpaperv2` use website https://wall.alphacoders.com
- `wallpaperv3` use website https://www.hdwallpapers.in


### Religions
```js
// Religions
const {
    asmaulhusna, asmaulhusnajson,
    alquran,
    jadwalsholat, listJadwalSholat
} = require('@bochilteam/scraper')

// Asmaul Husna
console.log(await asmaulhusna())
// Asmaul Husna Json
console.log(asmaulhusnajson) // the json will empty if you never use `asmaulhusna()`

// alquran 
console.log(await alquran())
// Jadwal Sholat
console.log(await jadwalsholat('semarang'))
```
- `alquran` source: https://raw.githubusercontent.com/rzkytmgr/quran-api/master/data/quran.json
- `asmaulhusna` source: https://raw.githubusercontent.com/BochilTeam/database/master/religi/asmaulhusna.json
- `jadwalsholat` use website https://www.jadwalsholat.org


### Games
```js
// Games
const {
    tebakgambar, tebakgambarjson,
    asahotak, asahotakjson
} = require('@bochilteam/scraper')

// Tebak gambar
console.log(await tebakgambar())
// Tebak gambar json
console.log(tebakgambarjson) // the json will empty if you never use `tebakgambar()`

// Asahotak
console.log(await asahotak())
// Asahotak json
console.log(asahotakjson) // the json will empty if you never use `asahotak()`
```
- `asahotak` source: https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json
- `caklontong` source: https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json
- `family100` source: https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json
- `siapakahaku` source: https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json
- `susunkata` source: https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json
- `tebakbendera` source: https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera.json
- `tebakgambar` source: https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json
- `tebakkabupaten` source: https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkabupaten.json
- `tebakkata` source: https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json
- `tebakkimia` source: https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkimia.json
- `tebaklirik` source: https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json
- `tebaktebakan` source: https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json
- `tekateki` source: https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json


### News
```js
// News
const {
    cnbindonesia,
    antaranews,
    kompas
} = require('@bochilteam/scraper')

// Cnbindonesia
console.log(await cnbindonesia())
// Antaranews
console.log(await antaranews())
// Kompas
console.log(await kompas())
```
- `antaranews` use website https://www.antaranews.com
- `cnbindonesia` use website https://www.cnbcindonesia.com
- `kompas` use website https://www.kompas.com


### Encryption
```js
// Encryption
const {
    toBase64,
    fromBase64ToString,
    randomUUID,
    randomBytes,
    createHash
} = require('@bochilteam/scraper')

// To base64
const base64 = toBase64('Hello World!!')
console.log(base64)
// From base64 to string
console.log(fromBase64ToString(base64)) // 'Hello World!!'
// Random UUID
console.log(randomUUID())
// Random Bytes
console.log(randomBytes(16))
// Hash
console.log(createHash('sha256', 'Hello World!!'))
```
- `randomUUID` source: https://github.com/uuidjs/uuid/blob/main/src/v4.js and https://github.com/nodejs/node/blob/master/lib/internal/crypto/random.js
- `randomBytes` use `crypto` module
- `createHash` use `crypto` module