import axios from "axios";

export default async function artimimpi(mimpi: string): Promise<string[]> {
    const { data } = await axios.get<string>(`https://www.primbon.com/tafsir_mimpi.php?mimpi=${mimpi}&submit=+Submit+`)
    const results: string[] | void = data.split('</i></b><br><br>')[1]?.split('<!-- AWAL IN-ARTICLE ADV -->')[0]?.replace(/<(\/)?font( color=#ff0000)?>/gi, '')?.trim()?.split('<br><br>')?.filter((v: string) => v)
    return results || []
}