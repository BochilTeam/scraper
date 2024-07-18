# Scraper 
Scraper is a Nodejs library with many built-in features that can get data from websites using only HTTP. It is designed to be simple, and easy to use. 

## Installation
Install stable version of Scraper:
```sh
npm i @bochilteam/scraper
```

Install latest version from github (not recommended)
```sh
npm i github:bochilteam/scraper
```

## Usage 
Here is an example of using Savefrom to download Facebook video
```ts
import { savefrom } from '@bochilteam/scraper'

const data = await savefrom('https://fb.watch/9WktuN9j-z/')
console.log(data) // JSON
```
[Documentation](https://bochilteam.github.io/scraper/)

## Features
- Simple and easy to use
- Have many of features
- You can install the package that you will use


## Packages
- [BMKG Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-bmkg/) -- Contains scrapers [BMKG](https://www.bmkg.go.id/) website
- [Facebook Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-facebook/) -- To download [Facebook](https://www.facebook.com/) video
- [Games data Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-games/) -- Fetcher data from [games databases](https://github.com/BochilTeam/database/tree/master/games)
- [GoogleIt Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-googleit/) -- Scraper to get search data from [Google](https://www.google.com) Search
- [Images Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-images/) -- Scraper to find pictures/images 
- [Instagram Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-instagram/) -- To download [Instagram](https://www.instagram.com/) video and story
- [Lyric Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-lyric/) -- Scraper to find lyric from the song
- [Mediafire Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-mediafire/) -- To download [Mediafire](https://www.mediafire.com/) aplouded content
- [News Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-news/) -- News scraper from Indonesian news sites
- [Primbon Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-primbon/) -- Primbon Scraper
- [Religions Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-religions/) -- Data scraper for a religion
- [Savefrom Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-savefrom/) -- Scraper to get data from [Savefrom](https://savefrom.net/)
- [Sfile.mobi Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-sfilemobi/) -- To download [Sfile.mobi](https://sfile.mobi/) aplouded content
- [Snapsave Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-snapsave/) -- Scraper to get data from [Snapsave](https://snapsave.app/)
- [Text Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-texts/) -- Texts scraper or Fetcher texts data from [texts databases](https://github.com/BochilTeam/database/tree/master/kata-kata)
- [Tiktok Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-tiktok/) -- To download [Tiktok](https://www.tiktok.com/) video
- [Twitter Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-twitter/) -- To download [X](https://x.com/) video
- [Wikipedia Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-wikipedia/) -- Scraper to get data from [Wikipedia](https://www.wikipedia.org/)
- [Youtube Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-youtube/) -- To download [Youtube](https://www.youtube.com/) video
- [Others Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-others/) -- Others, like Bioskop, Chord, Id Free Fire, Jadwal TV, KBBI, Kodepos
- [Scraper](#scraper) -- All In One Scraper

## Contributing
If you find a bug or have a feature request, please open an issue on our GitHub repository.

We welcome contributions from the community. If you'd like to contribute, please fork the repository and submit a pull request.

## License
Scraper is licensed under the GPL-3.0-or-later license. See [LICENSE](LICENSE) for more information.