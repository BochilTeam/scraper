# Facebook Scraper
Module to download content from Facebook
[Documentation](https://bochilteam.github.io/scraper/modules/_bochilteam_scraper_facebook.html)

## Installation
```sh
npm i @bochilteam/scraper-facaebook
```

## Usage 
Example download Instagram video
```ts
// import module
import { facebookdl } from '@bochilteam/scraper-facebook'

const data = await facebookdl('https://fb.watch/9WktuN9j-z/')
console.log(data) // JSON
```

## Example Response
```ts
{
    thumbnail: 'https://scontent-ams4-1.xx.fbcdn.net/v/t15.5256-10/150364106_175310434146963_1171304898769276273_n.jpg?stp=dst-jpg_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=50ce42&_nc_ohc=Bz4ZVVZUjDwQ7kNvgFF01_v&_nc_ht=scontent-ams4-1.xx&oh=00_AYD_uf7eqa64oPuf0Pm-u6O47v0Jq0LcnprHdxQeHhOOnw&oe=669E5BB8',
    duration: '0:18',
    video: [
        { quality: '720p (HD)', download: [AsyncFunction: download] },
        { quality: '360p (SD)', download: [AsyncFunction: download] }
    ],
    audio: [ 
        { quality: '7kbps', download: [AsyncFunction: download] } 
    ]
}
```