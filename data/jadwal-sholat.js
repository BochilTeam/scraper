const got = require('got')
const cheerio = require('cheerio')
const fs = require('fs')

const PATH = './jadwal-sholat.json'

async function getCitySelectOption() {
    const html = await got('https://jadwalsholat.org/jadwal-sholat/monthly.php').text()
    const $ = cheerio.load(html)

    return $('.inputcity > option').map(function () {
        const $option = $(this)
        let kota = $option.text().trim().toLowerCase()
        if (kota.includes(',')) [kota, _] = kota.split(',')

        return {
            kota,
            value: $option.attr('value').trim()
        }
    }).toArray()
}

function writeData(data) {
    const json = JSON.stringify(
        data.sort((a, b) => a.value - b.value),
        null, 4)
    return fs.promises.writeFile(PATH, json)
}

getCitySelectOption().then(writeData)