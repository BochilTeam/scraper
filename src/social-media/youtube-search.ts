import request from 'request'
import cheerio from 'cheerio'

interface IresyoutubeSearch {
    video: {
        authorName: string;
        videoId: string;
        thumbnail: string;
        title: string;
        description?: string;
        publishedTime: string;
        durationH: string;
        duration: string;
        viewH: string;
        view: string;
        type: 'video'
    }[],
    channel: {
        channelId: string;
        channelName: string;
        avatar: string;
        isVerified: boolean;
        subscriberH: string;
        subscriber: string;
        videoCount: string;
        description: string;
        type: 'channel'
    }[],
    playlist: {
        playlistId: string;
        title: string;
        thumbnail: string;
        video: {
            videoId: string;
            title: string;
            durationH: string;
            duration: string;
        }[];
        type: 'mix'
    }[]
}

export default function youtubeSearch(query: string): Promise<IresyoutubeSearch> {
    return new Promise<IresyoutubeSearch>((resolve, reject) => {
        request(`https://www.youtube.com/results?search_query=${query}`, {
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
            }
        }, (error, response, body) => {
            if (error) return reject(error)
            const $ = cheerio.load(body)
            let sc
            $('script').map(function () {
                const el = $(this).html()
                let regex: RegExpExecArray
                if (regex = /var ytInitialData = /gi.exec(el)) sc = JSON.parse(regex.input.replace(/^var ytInitialData = /i, '').replace(/;$/, ''))
            })
            const results: IresyoutubeSearch = { video: [], channel: [], playlist: [] };
            (sc.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents as any[]).forEach((v: { [Key: string]: any }, i) => {
                const typeName = Object.keys(v)[0]
                const result = v[typeName]
                if (['horizontalCardListRenderer', 'shelfRenderer'].includes(typeName)) return // Todo: add this result as results
                const isChannel = typeName === 'channelRenderer'
                const isVideo = typeName == 'videoRenderer'
                const isMix = typeName === 'radioRenderer'
                console.log()
                console.log(JSON.stringify(result, null, 4))
                console.log()
                if (isVideo) results.video.push({
                    authorName: result.ownerText.runs[0].text,
                    videoId: result.videoId,
                    thumbnail: result.thumbnail.thumbnails.pop().url,
                    title: result.title.runs.pop().text,
                    description: result.detailedMetadataSnippets?.pop().snippetText.runs?.pop().text || '',
                    publishedTime: result.publishedTimeText?.simpleText,
                    durationH: result.lengthText?.accessibility.accessibilityData.label,
                    duration: result.lengthText?.simpleText,
                    viewH: result.viewCountText?.simpleText,
                    view: result.viewCountText?.simpleText.split('x')[0].trim(),
                    type: typeName.replace(/Renderer/i, '') as 'video'
                })

                if (isChannel) results.channel.push({
                    channelId: result.channelId,
                    channelName: result.title.simpleText,
                    avatar: 'https:' + result.thumbnail.thumbnails.pop().url,
                    isVerified: result.ownerBadges.pop().metadataBadgeRenderer.style === 'BADGE_STYLE_TYPE_VERIFIED',
                    subscriberH: result.subscriberCountText.accessibility.accessibilityData.label,
                    subscriber: result.subscriberCountText.simpleText.split(' ')[0],
                    videoCount: result.videoCountText.runs[0].text,
                    description: result.descriptionSnippet.runs.pop().text,
                    type: typeName.replace(/Renderer/i, '') as 'channel'
                })

                if (isMix) results.playlist.push({
                    playlistId: result.playlistId,
                    title: result.title.simpleText,
                    thumbnail: result.thumbnail.thumbnails.pop().url,
                    video: result.videos.map(({ childVideoRenderer }) => {
                        return {
                            videoId: childVideoRenderer.videoId,
                            title: childVideoRenderer.title.simpleText,
                            durationH: childVideoRenderer.lengthText.accessibility.accessibilityData.label,
                            duration: childVideoRenderer.lengthText.simpleText,
                        }
                    }),
                    type: 'mix'
                })
            })
            return resolve(results)

        })

    })

}