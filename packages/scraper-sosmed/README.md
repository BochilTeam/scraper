# Social media Scraper
Scraper social media data

## Installation
```sh
npm i @bochilteam/scraper-sosmed
```

## Usage 
Example tiktok video download
```ts
// Import module
import { savefrom, tiktokdl } from '@bochilteam/scraper-sosmed'

const url = 'https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226'
// Using tiktokdl
const data = await tiktokdl(url)
console.log(data) // JSON
// Using savefrom
const result = await savefrom(url)
console.log(result) // JSON
```
[Documentation](https://bochilteam.github.io/scraper/modules/_bochilteam_scraper_sosmed.html)