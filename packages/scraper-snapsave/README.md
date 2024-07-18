# SnapSave Scraper
[Documentation](https://bochilteam.github.io/scraper/modules/_bochilteam_scraper_instagram.html)

## Installation
```sh
npm i @bochilteam/scraper-snapsave
```

## Usage 
Example download Instagram video
```ts
// import module
import { snapsave } from '@bochilteam/scraper-snapsave'

const data = await snapsave('https://www.instagram.com/reel/CxSEjxfyJtN')
console.log(data) // JSON
```
