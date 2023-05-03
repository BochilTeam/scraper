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

## Features
- Simple and easy to use
- Have many of features
- You can install the package that you will use


## Packages
- [BMKG Scraper](./packages/scraper-bmkg/README.md) -- Contains scrapers [BMKG](https://www.bmkg.go.id/) website
- [Downloader Scraper](./packages/scraper-downloader/README.md) -- Contains scrapers from downloader sites
- [Games data Scraper](./packages/scraper-games/README.md) -- Fetcher data from [games databases](https://github.com/BochilTeam/database/tree/master/games)
- [Images Scraper](./packages/scraper-images/README.md) -- Scraper to find pictures/images 
- [News Scraper](./packages/scraper-news/README.md) -- News scraper from Indonesian news sites
- [Primbon Scraper](./packages/scraper-primbon/README.md) -- Primbon Scraper
- [Religions Scraper](./packages/scraper-religions/README.md) -- Data scraper for a religion
- [Social media Scraper](./packages/scraper-sosmed/README.md) -- Scraper social media data
- [Text Scraper](./packages/scraper-texts/README.md) -- Texts scraper or Fetcher texts data from [texts databases](https://github.com/BochilTeam/database/tree/master/kata-kata)
- [Others Scraper](./packages/scraper-news/README.md) -- Others
- [Scraper](#scraper) -- All In One Scraper

## Contributing
If you find a bug or have a feature request, please open an issue on our GitHub repository.

We welcome contributions from the community. If you'd like to contribute, please fork the repository and submit a pull request.

## License
Scraper is licensed under the GPL-3.0-or-later license. See [LICENSE](LICENSE) for more information.