type Ires = 'capricorn' | 'aquarius' | 'pisces' | 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagitarius'

export default function getZodiac(months: number, dates: number): Ires {
    // https://github.com/Nurutomo/wabot-aq/blob/master/plugins/zodiac.js
    const d = new Date(1970, months - 1, dates + 1)
    // https://www.primbon.com/zodiak.htm
    const zodiac = [
        ['capricorn', new Date(1970, 0, 21)], // CAPRICORN (22 Desember - 20 Januari)
        ['aquarius', new Date(1970, 1, 20)], // AQUARIUS (21 Januari - 19 Februari)
        ['pisces', new Date(1970, 2, 21)], // PISCES (20 Februari - 20 Maret)
        ['aries', new Date(1970, 3, 20)], // ARIES (21 Maret – 19 April)
        ['taurus', new Date(1970, 4, 21)], // TAURUS (21 April - Mei 20)
        ['gemini', new Date(1970, 5, 22)], // GEMINI (21 Mei - Juni 21)
        ['cancer', new Date(1970, 6, 23)], // CANCER (22 Juni - Juli 22)
        ['leo', new Date(1970, 7, 24)], // LEO (23 Juli - 23 Agustus)
        ['virgo', new Date(1970, 8, 23)], // VIRGO (24 Agustus - 22 September)
        ['libra', new Date(1970, 9, 24)], // LIBRA (23 September - 23 Oktober)
        ['scorpio', new Date(1970, 10, 23)], // SCORPIO (24 Oktober - 22 November)
        ['sagitarius', new Date(1970, 11, 22)], // SAGITARIUS (23 November - 21 Desember)
    ]
    return zodiac.find(([_, _d]: [string, Date]) => _d >= d)[0] as Ires

}