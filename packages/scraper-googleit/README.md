# Google It Scraper
Module to scrape content from Google
[Documentation](https://bochilteam.github.io/scraper/modules/_bochilteam_scraper_googleit.html)

## Installation
```sh
npm i @bochilteam/scraper-tiktok
```

## Usage 
```ts
// import module
import { googleit } from '@bochilteam/scraper-googleit'

const data = await googleit('Minecraft')
console.log(data) // JSON
```

## Example Response
```json
{
    "title": "Minecraft",
    "type": "Kompilasi permainan video",
    "description": "Minecraft mendapat ulasan dengan 4,448 bintang di Google Play.\nMinecraft mendapat ulasan dengan 4,5 bintang di App Store - Apple.\nMinecraft adalah sebuah permainan bak pasir yang dikembangkan oleh pengembang permainan Swedia Mojang Studios. Permainan ini dibuat oleh Markus \"Notch\" Persson dalam bahasa pemrograman Java. Wikipedia\nMode: Permainan video pemain tunggal, Permainan video multipemain\nBahasa pemrograman: Java\nPenghargaan: Nickelodeon Kids' Choice Award untuk Permainan Video Terfavorit,\nNominasi: Penghargaan Video Game BAFTA untuk Multiplayer,\nGenre: Permainan petualangan-aksi, Gameplay nonlinier\nPerancang: Markus Persson, Jens Bergensten\nPengembang: Mojang, Other Ocean Interactive, Xbox Game Studios, 4J Studios, Other Ocean Group",
    "related": [
        "Berapa harga Minecraft 2024?",
        "Dimana download Minecraft PC?",
        "Apakah Minecraft ada yang gratis?",
        "Apakah Minecraft bisa di laptop?"
    ],
    "articles": [
        {
            "url": "https://www.minecraft.net › ...",
            "header": "Minecraft",
            "iconBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAATlBMVEVSpTVRpDRJli9PoDNMmzEAAwABDgIAAAA9eydUqTY9eygCAAUJCAhdpEE2ZiQfRxUgQRU6diYGFQUOIgk3byRGeTEVGhFBgCpYqztis0Op4b1OAAAAiUlEQVR4AdXLBQ7EIBRF0Y9Td9v/QvG6xEZvhZecAH8YwjZiJ3ETbZAyzrmQEUAkhZmMblHYAtrOGFuMT/h8M0nTNPHo5hYhs+WFKXcTDkVRKUxlFMEpQqlHSsnpXlU33CJv6io6YiuW2g9il5m6G5SRSV5h1fdDZM6h76sjwjhN4+Y8hNDmfGsa0OAJeZWq1QUAAAAASUVORK5CYII=",
            "title": "Welcome to the Minecraft Official Site",
            "description": "Explore new gaming adventures, accessories, & merchandise on the Minecraft Official Site. Buy & download the game here, or check the site for the latest ...",     
            "footer": ""
        },
        {
            "url": "https://play.google.com › store › apps › details › id=com...",
            "header": "Google Play",
            "iconBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADNklEQVR4AcXUA4wdURiG4VPbtu32mmvUtm3bts2gnNq2bbtBbSzn3n79M8nZrvdcZZO8yUTzPUMGIFmLOlBJTXhtqcPUUaoDxRwp16aObORuHcNpxmwnUjM5/uICam0PyKza2miJSmoGOlH0HlIGjwPUm9tOqrXdD6qt9RANEb39VEGPAXym/5YMK9ehxu5ahKgbH4I3m0rjdoDfBEj+EwDDyrUiiO9UR7ffAd8pMvzHAyJ3Ivr74R7AtD8SIRATURO1ttWBakuCCN4BqrDLAApRiAmAcflm1NilJUSwCAJqqcm8nBs7pRu4y+gCIAoRqdwJ07LtdCfUSSLUlEZqjBQbevwctVvX1QUA7zd8pkYIIfh41o2d0Xh7ICJOpAFOsic0ZHYBIIZQKynjaLQtCPLJVKCrRyQhaAjUYaqIMCBxxA5CqAgRRIjmUMapzBu7oHG0cZmPx2welU4AkARi6T7U3KWHanuAgshCV952hy/sJ1MmNs77Q5mcAHBEuIKwLD6Mmrv1yCS1QMftfsApJjLO+0A1cxjAEb5TwxRE/uX30PmkFrjAgJPRn7lQklMAXwL4TAtB8UVA927PIA8sBNxikC+mhHzMgwA+7j0tFEWXAN1GXkGksSzkMpXxdWBZ/L3LYLvMRBHfqLbCAD7uNT0MJRYDfYedQ4S5FOymonjvbcD7Slb86Fsa9psM9itJIuxUsPhLGG282BJg8ODjgL4QbKbieO+nxyc/NT55a/CughXfu5dLCrGGyir2GcYzPoTGYSiESFNJGtfhk69aSUH4qPG+YoKIc1Q58R+R+Hj8iJ5lYbuUArazKd/QkL9Tv2Lfqb9hpfGiSYzHh3hXxjv05/Di/e23GB8TB/Bxy4xw5YUbMfAwjRdJajw6Yun7KpaM37uWY/YbBDjpIICP023HxH47AV0ehJtLi4wfp0pR7H01M6OvwnGA/9Rf0v/xHTSeF2GWMviQ+PhzykoxJVcA1eZBKh5jvGxi47+oHnzULYCacyFN7is0Po9KRzG3Am7XbzopxFoeoZZyCY0foIrwIbcDZFPxzN+9qy2JZ/whZeADngJEP0k76gB1kOooOuwKIFn7B3LHHIJtp64TAAAAAElFTkSuQmCC",
            "title": "Minecraft - Aplikasi di Google Play",
            "description": "Minecraft adalah permainan yang terbuat dari blok yang dapat diubah menjadi apa pun yang dapat kamu bayangkan. Bermain dalam Mode Kreatif dengan sumber daya ...", 
            "footer": "Skor: 4,4 · ‎5.043.024 suara · ‎US$6,99 · ‎Android · ‎Game"
        },
        {
            "url": "https://play.google.com › store › apps › details › id=com...",
            "header": "Google Play",
            "iconBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADNklEQVR4AcXUA4wdURiG4VPbtu32mmvUtm3bts2gnNq2bbtBbSzn3n79M8nZrvdcZZO8yUTzPUMGIFmLOlBJTXhtqcPUUaoDxRwp16aObORuHcNpxmwnUjM5/uICam0PyKza2miJSmoGOlH0HlIGjwPUm9tOqrXdD6qt9RANEb39VEGPAXym/5YMK9ehxu5ahKgbH4I3m0rjdoDfBEj+EwDDyrUiiO9UR7ffAd8pMvzHAyJ3Ivr74R7AtD8SIRATURO1ttWBakuCCN4BqrDLAApRiAmAcflm1NilJUSwCAJqqcm8nBs7pRu4y+gCIAoRqdwJ07LtdCfUSSLUlEZqjBQbevwctVvX1QUA7zd8pkYIIfh41o2d0Xh7ICJOpAFOsic0ZHYBIIZQKynjaLQtCPLJVKCrRyQhaAjUYaqIMCBxxA5CqAgRRIjmUMapzBu7oHG0cZmPx2welU4AkARi6T7U3KWHanuAgshCV952hy/sJ1MmNs77Q5mcAHBEuIKwLD6Mmrv1yCS1QMftfsApJjLO+0A1cxjAEb5TwxRE/uX30PmkFrjAgJPRn7lQklMAXwL4TAtB8UVA927PIA8sBNxikC+mhHzMgwA+7j0tFEWXAN1GXkGksSzkMpXxdWBZ/L3LYLvMRBHfqLbCAD7uNT0MJRYDfYedQ4S5FOymonjvbcD7Slb86Fsa9psM9itJIuxUsPhLGG282BJg8ODjgL4QbKbieO+nxyc/NT55a/CughXfu5dLCrGGyir2GcYzPoTGYSiESFNJGtfhk69aSUH4qPG+YoKIc1Q58R+R+Hj8iJ5lYbuUArazKd/QkL9Tv2Lfqb9hpfGiSYzHh3hXxjv05/Di/e23GB8TB/Bxy4xw5YUbMfAwjRdJajw6Yun7KpaM37uWY/YbBDjpIICP023HxH47AV0ehJtLi4wfp0pR7H01M6OvwnGA/9Rf0v/xHTSeF2GWMviQ+PhzykoxJVcA1eZBKh5jvGxi47+oHnzULYCacyFN7is0Po9KRzG3Am7XbzopxFoeoZZyCY0foIrwIbcDZFPxzN+9qy2JZ/whZeADngJEP0k76gB1kOooOuwKIFn7B3LHHIJtp64TAAAAAElFTkSuQmCC",
            "title": "Uji Coba Minecraft - Aplikasi di Google Play",
            "description": "Minecraft adalah permainan dengan akhir terbuka tempat kamu menentukan sendiri petualangan yang ingin kamu ikuti. Jelajahi dunia tidak terbatas* dan buat ...",    
            "footer": "Skor: 4 · ‎3.010.182 suara · ‎Gratis · ‎Android · ‎Game"
        },
        {
            "url": "https://www.youtube.com › watch",
            "header": "YouTube",
            "thumbnail": "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            "iconBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAwklEQVR4AWNwL/ChKx6GFo5a+J+BQRmIfYE4HYgrgLgLiOdA8VqsGCHfBdWTDjVDGaeFQElmIL4CxP+pjK/gsnA7SAGN8FpsFv6nJUaxECggSmsLQXYgW2hOlKbs7P//7ezItVAf2UJfojTNnv0fDNauJcdCX2QLo0iwEAHa2si2MJ1ECxHg1StIUBPWH0V3C+kepOQnmi1byE809M8W9M/49C/a6F940796wqyAo/BUvtuRMZ5KOApk1mibhmI8aiEAWJrZd6IgmiUAAAAASUVORK5CYII=",
            "title": "Official Minecraft Trailer",
            "description": "Thank you to Vareide for making this awesome Minecraft trailer! Check out other stuff from Vareide here: ...",
            "footer": ""
        },
        {
            "url": "https://www.youtube.com › minecraft",
            "header": "YouTube",
            "iconBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAwklEQVR4AWNwL/ChKx6GFo5a+J+BQRmIfYE4HYgrgLgLiOdA8VqsGCHfBdWTDjVDGaeFQElmIL4CxP+pjK/gsnA7SAGN8FpsFv6nJUaxECggSmsLQXYgW2hOlKbs7P//7ezItVAf2UJfojTNnv0fDNauJcdCX2QLo0iwEAHa2si2MJ1ECxHg1StIUBPWH0V3C+kepOQnmi1byE809M8W9M/49C/a6F940796wqyAo/BUvtuRMZ5KOApk1mibhmI8aiEAWJrZd6IgmiUAAAAASUVORK5CYII=",
            "title": "Minecraft",
            "description": "13.2M subscribers•990 videos. This is the official YouTube channel of Minecraft. We tell stories about the Minecraft Universe. ...more ...more",
            "footer": ""
        },
        {
            "url": "https://apps.apple.com › app",
            "header": "Apple",
            "iconBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC5UlEQVR4Aa1XQ3hkQRjc+ynX2OZtbfu+tm3b1nlt27a9O4qNS5xxbdd+cTKvXydT31fJoPuvmvf6/ejw86dBlX6CwwQXCq6t5cLaz/xV4+ld6F8r9NdgsCAjIwf5+UUoLCwBydf8jN+JNQbBddzjDQM+gocErRSyWm2QgWu4lntq9/q01UAfwYKCgmK43W6ognu4lzEE+6oamCboLC0tR3vBGIwlOF2vgZm5uQWoqamBXrhcLpw5cxZ79uxFKxCxrGBMxpYZ6Eu33KAXNDp+/AQEBgbzv8Y6Kxi7+e1ofuAKVS/7zp27KE7i6dNnem5HAbVaM3CYh0YF/PWRkdEUpxHoQe3BPNTcQJCgTc9pT0tLh8VigdPpBLFv3368evVKBC7A16/fkJmZKX06qCXo39jAej67Wnjx4iVGjBiJ0NBwBAeHYsCAgTh48BCuXLmCKVOmIioqBrwS4eGRGDduPMxmMzyBWtRsbMCglWSePXuOkJAwCuhmnz79YLVaPSUrGjDWGQhgCvWEyspKdOrURUk8JiYO799/0Exg1KQ2DQxjHveEO3fuKomTPBcyUJPaNLCQxcQTNm3arGzAYDBABmoK7UU0sE7rAC5dukxJPCgoRPy6DMhATWpLDWzbtl35Cty//0DBgOQW3LhxU9nAsGEj4HA4dN0CySHkwvy6bKfECRMmISsrS34IZY8hMXnyFAZV5rFjx6WPoa5E9PnzZ2XxpKQUlJaWaiUik1IqXrBgkZKB06fPwBOKiv4fwA3Ni5FdK3NVVFSgd+++usRnzJilXIzII7JynJOTAxaa7t17Yt68+bh37z6+fPmKCxcuYvToMejVqzdWrVrNMi0rx4cVGxIFKDQkCi2ZAhRaMklTavWqeF6epCltxuneasvLyurb8lmqg0lfLw4m/dozmh0RtBUV6R/NuJZ7avf6eGs4ZeIwMoVmZrYcTvkZv+MarlUZTlUZIDi8diRfX8uFtZ8FqMb7Bx+2VJbBTrlcAAAAAElFTkSuQmCC",
            "title": "Minecraft on the App Store",
            "description": "Explore infinite worlds and build everything from the simplest of homes to the grandest of castles. Play in creative mode with unlimited resources or mine ...",   
            "footer": "Skor: 4,5 · ‎681.303 ulasan · ‎US$6,99 · ‎iOS · ‎Game"
        }
    ]
}
```