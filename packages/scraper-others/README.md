# Others Scraper
Other.
[Documentation](https://bochilteam.github.io/scraper/modules/_bochilteam_scraper_others.html)

## Installation
```sh
npm i @bochilteam/scraper-others
```

## Usage 
```ts
// Import module
import { kodepos } from '@bochilteam/scraper-others'

const data = await kodepos('Samboja')
console.log(data) // JSON
```

## Example Response
### **KBBI**
```json
[
    {
        "index": 1,
        "title": "ha.lo1",
        "means": [
            "p        kata yang digunakan untuk mengawali percakapan melalui telepon",
            "p        kata seru untuk menarik perhatian (seseorang)",
            "p        ucapan salam untuk menyapa (seseorang)"
        ]
    },
    {
        "index": 2,
        "title": "ha.lo2",
        "means": [
            "n        lingkaran atau berkas sinar di sekeliling suatu benda angkasa yang berkilauan (matahari, bulan, dan sebagainya), sebagai akibat dari pantulan atau pembiasan sumber cahaya itu sendiri"
        ]
    }
]
```
### **KodePos**
```json
[
    {
        "kodepos": "75592",
        "desa": "Sungai Seluang",
        "kecamatan": "Samboja",
        "kota": "KAB. KUTAI KARTANEGARA",
        "provinsi": "KALIMANTAN TIMUR"
    },
    {
        "kodepos": "75592",
        "desa": "Wonotirto",
        "kecamatan": "Samboja",
        "kota": "KAB. KUTAI KARTANEGARA",
        "provinsi": "KALIMANTAN TIMUR"
    },
    {
        "kodepos": "75592",
        "desa": "Tanjung Harapan",
        "kecamatan": "Samboja",
        "kota": "KAB. KUTAI KARTANEGARA",
        "provinsi": "KALIMANTAN TIMUR"
    },
    {
        "kodepos": "75592",
        "desa": "Samboja Kuala",
        "kecamatan": "Samboja",
        "kota": "KAB. KUTAI KARTANEGARA",
        "provinsi": "KALIMANTAN TIMUR"
    },
    {
        "kodepos": "75592",
        "desa": "Sanipah",
        "kecamatan": "Samboja",
        "kota": "KAB. KUTAI KARTANEGARA",
        "provinsi": "KALIMANTAN TIMUR"
    },
    {
        "kodepos": "75592",
        "desa": "Handil Baru",
        "kecamatan": "Samboja",
        "kota": "KAB. KUTAI KARTANEGARA",
        "provinsi": "KALIMANTAN TIMUR"
    },
    {
        "kodepos": "75592",
        "desa": "Teluk Pemedas",
        "kecamatan": "Samboja",
        "kota": "KAB. KUTAI KARTANEGARA",
        "provinsi": "KALIMANTAN TIMUR"
    },
    {
        "kodepos": "75592",
        "desa": "Karya Jaya",
        "kecamatan": "Samboja",
        "kota": "KAB. KUTAI KARTANEGARA",
        "provinsi": "KALIMANTAN TIMUR"
    },
    {
        "kodepos": "75592",
        "desa": "Beringin Agung",
        "kecamatan": "Samboja",
        "kota": "KAB. KUTAI KARTANEGARA",
        "provinsi": "KALIMANTAN TIMUR"
    }
]
```