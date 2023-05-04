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
- [Downloader Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-downloader/) -- Contains scrapers from downloader sites
- [Games data Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-games/) -- Fetcher data from [games databases](https://github.com/BochilTeam/database/tree/master/games)
- [Images Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-images/) -- Scraper to find pictures/images 
- [News Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-news/) -- News scraper from Indonesian news sites
- [Primbon Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-primbon/) -- Primbon Scraper
- [Religions Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-religions/) -- Data scraper for a religion
- [Social media Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-sosmed/) -- Scraper social media data
- [Text Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-texts/) -- Texts scraper or Fetcher texts data from [texts databases](https://github.com/BochilTeam/database/tree/master/kata-kata)
- [Others Scraper](https://github.com/BochilTeam/scraper/tree/master/packages/scraper-news/) -- Others
- [Scraper](#scraper) -- All In One Scraper

## Contributing
If you find a bug or have a feature request, please open an issue on our GitHub repository.

We welcome contributions from the community. If you'd like to contribute, please fork the repository and submit a pull request.

## License
Scraper is licensed under the GPL-3.0-or-later license. See [LICENSE](LICENSE) for more information.