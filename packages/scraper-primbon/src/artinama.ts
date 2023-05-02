import got from 'got'
import { ArtiNama, ArtiNamaSchema } from '../types/index.js'

export default async function artinama (nama: string): Promise<ArtiNama> {
  const data = await got(
    `https://www.primbon.com/arti_nama.php?nama1=${encodeURIComponent(nama).replace(/%20/g, '+')}&proses=+Submit%21+`
  ).text()
  const start = data
    .split('<h1>ARTI NAMA</h1>')[1]
  const results: string | undefined = (start.split('</center><br>')[1] || start)
    ?.split('<TABLE>')[0]
    ?.replace(/<(\/)?(h1|br|i|b)>/gim, '')
    ?.trim()
  if (!results) throw new Error(`Arti nama ${nama} not found!`)
  return ArtiNamaSchema.parse(results)
}
