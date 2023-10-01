# Youtube Scraper
Scraper Youtube data like download video Youtube

## Installation
```sh
npm i @bochilteam/scraper-youtube
```

## Usage 
Example download youtube video
```ts
// import module
import { youtubedl } from '@bochilteam/scraper-youtube'

const data = await youtubedl('https://youtu.be/iik25wqIuFo')
console.log(data) // JSON
const resolutions = Object.keys(data.video) // List of resolution/quality
console.log(resolutions) 
const url = await data.video[resolutions[0]].download() // Download '720p' video
console.log(url) // string
```
[Documentation](https://bochilteam.github.io/scraper/modules/_bochilteam_scraper_youtube.html)