import got from 'got'
import { DEFAULT_HEADERS } from './constant.js'
import {
    ItemSectionRendererContent,
    YoutubeSearchArgsSchema,
    YoutubeSearchResponseSchema,
    YoutubeSearchVideo,
    YoutubeSearchChannel,
    YoutubeSearchSchema
} from '../types/youtube-search/index.js'
import { time2Number } from './util.js'

export default async function youtubeSearch(query: string) {
    YoutubeSearchArgsSchema.parse(arguments)

    const html = await got('https://www.youtube.com/results', {
        headers: {
            ...DEFAULT_HEADERS
        },
        searchParams: {
            // Append ?search_query=query
            search_query: query
        }
    }).text()
    const script = /var ytInitialData = {(.*?)};/.exec(html)?.[1]
    if (!script) {
        throw new Error(`Can't find script data (ytInitialData)!`)
    }
    const json = JSON.parse('{' + script + '}')
    const parsed = YoutubeSearchResponseSchema.parse(json)
    const contents = parsed.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer!.contents
    const video: YoutubeSearchVideo[] = []
    const channel: YoutubeSearchChannel[] = []
    for (const content of contents) {
        const tag = Object.keys(content)[0] as keyof ItemSectionRendererContent
        if (tag === 'videoRenderer') {
            const data = content[tag]!
            const videoId = data.videoId
            const url = encodeURI('https://www.youtube.com/watch?v=' + videoId)
            const title = data.title.runs.pop()!.text
            const thumbnail = data.thumbnail.thumbnails.pop()!.url
            const description = data.detailedMetadataSnippets?.pop()!.snippetText.runs.map(({ text }) => text).join('') || ''
            const movingThumbnail = data.richThumbnail?.movingThumbnailRenderer.movingThumbnailDetails.thumbnails.pop()!.url
                ?? thumbnail
            const channelName = data.longBylineText.runs[0].text
                ?? data.longBylineText.runs[0].text
                ?? data.shortBylineText.runs[0].text
            const channelAvatar = data.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails.pop()!.url
            const isChannelVerified = data.ownerBadges
                ?.some((badge) => {
                    return badge.metadataBadgeRenderer.style === 'BADGE_STYLE_TYPE_VERIFIED'
                }) ?? false
            const publishedTime = data.publishedTimeText?.simpleText ?? 'unknown'
            const viewH = data.viewCountText.simpleText
                ?? data.shortViewCountText.simpleText
                ?? data.shortViewCountText.accessibility?.accessibilityData.label
                ?? '0 views'
            const view = parseInt(data.viewCountText.simpleText?.replace(',', '') ?? '0')

            const thumbnailOverlayTimeStatusRenderer = data.thumbnailOverlays.find((thumbnail) => {
                const key = Object.keys(thumbnail)[0]
                return key === 'thumbnailOverlayTimeStatusRenderer'
            })?.thumbnailOverlayTimeStatusRenderer
            const durationH = data.lengthText?.accessibility.accessibilityData.label!
                ?? thumbnailOverlayTimeStatusRenderer?.text.accessibility?.accessibilityData.label!
            const durationTime = thumbnailOverlayTimeStatusRenderer?.text.simpleText ?? '00:00'
            const isShort = durationTime === 'SHORTS'
            const duration = time2Number(isShort ? '00:60' : durationTime)

            video.push({
                videoId,
                url,
                title,
                thumbnail,
                description,
                movingThumbnail,
                channelName,
                channelAvatar,
                isChannelVerified,
                publishedTime,
                viewH,
                view,
                durationH,
                duration,
            })
        }

        if (tag === 'channelRenderer') {
            const data = content[tag]!
            const channelId = data.channelId
            const username = (data.longBylineText.runs.pop()?.navigationEndpoint.browseEndpoint.canonicalBaseUrl
                ?? data.longBylineText.runs.pop()?.navigationEndpoint.commandMetadata.webCommandMetadata.url
                ?? data.shortBylineText.runs.pop()?.navigationEndpoint.browseEndpoint.canonicalBaseUrl
                ?? data.shortBylineText.runs.pop()?.navigationEndpoint.commandMetadata.webCommandMetadata.url
                ?? data.subscriberCountText.simpleText)!.replace(/^\//, '')
            const channelName = data.title.text
                ?? username
            const url = encodeURI('https://www.youtube.com/' + username)
            const avatarUrl = data.thumbnail.thumbnails.pop()!.url
            const avatar = encodeURI('https:' + avatarUrl)
            const isChannelVerified = data.ownerBadges
                ?.some((badge) => {
                    return badge.metadataBadgeRenderer.style === 'BADGE_STYLE_TYPE_VERIFIED'
                }) ?? false
            const subscriberH = data.videoCountText.simpleText
            // const subscriber = 
            const description = data.descriptionSnippet.runs.map(({ text }) => text).join('')
            channel.push({
                channelId,
                url,
                channelName,
                username,
                avatar,
                isChannelVerified,
                subscriberH,
                // TODO: Add subscriber wich is number of subscriber
                description
            })
        }
    }
    return YoutubeSearchSchema.parse({
        video,
        channel
    })
}