import fetch from "node-fetch";

// only suppoert download video yet
export async function facebookdl(url: string): Promise<{
    id: string,
    thumbnail: string,
    duration: number,
    result: {
        size?: string,
        ext: string,
        url: string,
        quality: string,
        vcodec?: string,
        fid: string,
        isVideo: boolean,
        isAudio: boolean,
    }[]
}> {
    // https://fb.watch/9V3JrKcqHi/
    const res = await fetch(`https://youtube4kdownloader.com/ajax/getLinks.php?video=${encodeURIComponent(url)}&rand=a95ce6c6be8b6`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        }
    })
    const { data: { id, thumbnail, duration, a, av, v } } = await res.json()
    const result = a.concat(av).concat(v).map(({ size, ext, url, quality, vcodec, fid }) => {
        let isVideo = ext === 'mp4'
        let isWebm = ext === 'webm'
        return {
            size,
            ext,
            url,
            quality,
            vcodec,
            fid,
            isVideo: isVideo || isWebm,
            isAudio: /audio/i.test(quality) || (isVideo && !isWebm)
        }
        // ext webm video without audio
    })
    return {
        id, thumbnail, duration, result
    }
}