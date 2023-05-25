import cheerio from 'cheerio'
import got from 'got'
import { YoutubeSearch, YoutubeSearchSchema } from '../types/index.js'
import fs from 'fs'

type Ithumbnails = { url: string; width: number; height: number };
export default async function youtubeSearch (
  query: string
): Promise<YoutubeSearch> {
  const body = await got('https://www.youtube.com/results', {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
    },
    searchParams: {
      search_query: query
    }
  }).text()
  const $ = cheerio.load(body)
  let sc: { [Key: string]: any }
  $('script').map(function () {
    const el = $(this).html()
    let regex: RegExpExecArray | null
    if ((regex = /var ytInitialData = /gi.exec(el || ''))) {
      sc = JSON.parse(
        regex.input.replace(/^var ytInitialData = /i, '').replace(/;$/, '')
      )
    }
    return regex && sc
  })
  const results: YoutubeSearch = { video: [], channel: [], playlist: [] };
  const contents = sc!.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents
  for (const value of contents) {
    const typeName = Object.keys(value)[0]
    const result = value[typeName]
    if (typeName === 'shelfRenderer') {
      const items = result.content.verticalListRenderer.items
      if (Array.isArray(items) && items.length) contents.push(...items)
    }

    const isChannel = typeName === 'channelRenderer'
    const isVideo = typeName === 'videoRenderer'
    const isMix = typeName === 'radioRenderer'

    if (isVideo) {
      const videoId: string = result.videoId

      const authorName: string = (
        result.longBylineText?.runs[0]
        || result.ownerText?.runs[0]
        || result.shortBylineText?.runs[0]
      ).text
      const authorAvatar: string = result?.channelThumbnailSupportedRenderers?.channelThumbnailWithLinkRenderer?.thumbnail.thumbnails
        .find((obj: Object) => 'url' in obj && typeof obj.url === 'string')
        ?.url
      const thumbnail: string = result.thumbnail.thumbnails.pop().url
      const title: string = result.title.runs.find((obj: Object) => 'text' in obj && typeof obj.text === 'string')?.text
        || result.title.accessibility?.accessibilityData.label
      const description: string = result.detailedMetadataSnippets?.find((obj: Object) => 'snippetText' in obj && obj.snippetText && typeof obj.snippetText === 'object' && 'runs' in obj.snippetText && Array.isArray(obj.snippetText.runs))?.snippetText.runs
        .filter((run: Object) => 'text' in run && typeof run.text === 'string')
        .map((run: { text: string }) => run.text)
        .join('')
        || ''


      const viewH: string =
        result.viewCountText?.simpleText
        || result.shortViewCountText?.simpleText
        || result.shortViewCountText?.accessibility?.accessibilityData.label
      const view = (
        (viewH?.indexOf('x') === -1
          ? viewH?.split(' ')[0]
          : viewH?.split('x')[0]) || viewH
      ).trim()

      const durationH: string = result.lengthText?.accessibility?.accessibilityData.label
        || result.thumbnailOverlays?.find(
          (v: { [Key: string]: any }) =>
            Object.keys(v)[0] === 'thumbnailOverlayTimeStatusRenderer'
        )?.thumbnailOverlayTimeStatusRenderer.text.accessibility?.accessibilityData.label
      const duration: string = result.lengthText?.simpleText || result.thumbnailOverlays?.find(
        (v: { [Key: string]: any }) =>
          Object.keys(v)[0] === 'thumbnailOverlayTimeStatusRenderer'
      )?.thumbnailOverlayTimeStatusRenderer.text.simpleText
      let durationS: number = (duration.split('.').length && duration.indexOf(':') === -1 ?
        duration.split('.')
        : duration.split(':'))
        .reduce((prev, curr, i, arr) => {
          prev += durationMultipliers[arr.length]['' + i] * parseInt(curr)
          return prev
        }, 0)

      const publishedTime = result.publishedTimeText.simpleText
      results.video.push({
        authorName,
        authorAvatar,
        videoId,
        url: encodeURI('https://www.youtube.com/watch?v=' + videoId),
        thumbnail,
        title,
        description,
        publishedTime,
        durationH,
        durationS,
        duration,
        viewH,
        view,
        type: 'video'
      })
    }

    if (isChannel) {
      const channelId: string = result.channelId
      // idk?
      const subscriberH: string = (result.videoCountText.accessibility?.accessibilityData.label
        || result.videoCountText.simpleText).trim()
      const channelName: string = result.title.simpleText
        || result.shortBylineText.runs.find((run: Object) => 'text' in run && typeof run.text === 'string')?.text
      const username: string = result.subscriberCountText.simpleText
      const avatar: string = result.thumbnail.thumbnails.pop().url
      const description = result.descriptionSnippet.runs.filter((run: Object) => 'text' in run && typeof run.text === 'string')
        .map((run: { text: string }) => run.text)
        .join('')

      const subscriber: string = subscriberH.split(' ')
        .slice(0, subscriberH.split(' ').length - 1)
        .join(' ')
      const isVerified: boolean = result.ownerBadges.find((badge: Object) => 'metadataBadgeRenderer' in badge && badge.metadataBadgeRenderer && typeof badge.metadataBadgeRenderer === 'object')?.metadataBadgeRenderer.style === 'BADGE_STYLE_TYPE_VERIFIED'
        || false

      results.channel.push({
        channelId,
        url: encodeURI('https://www.youtube.com/channel/' + channelId),
        channelName,
        username,
        avatar: encodeURI('https:' + avatar),
        isVerified,
        subscriberH,
        subscriber,
        description,
        type: 'channel'
      })
    }

    if (isMix) {
      results.playlist.push({
        playlistId: result.playlistId,
        title: result.title.simpleText,
        thumbnail: result.thumbnail.thumbnails.pop().url,
        video: result.videos.map(({ childVideoRenderer }: { [Key: string]: any }) => {
          return {
            videoId: childVideoRenderer.videoId,
            title: childVideoRenderer.title.simpleText,
            durationH:
              childVideoRenderer.lengthText.accessibility
                .accessibilityData.label,
            duration: childVideoRenderer.lengthText.simpleText
          }
        }),
        type: 'mix'
      })
    }
  }
  return YoutubeSearchSchema.parse(results)
}

const durationMultipliers: { [key: string]: { [key: string]: number } } = {
  1: {
    0: 1
  },
  2: {
    0: 60,
    1: 1
  },
  3: {
    0: 3600,
    1: 60,
    2: 1
  }
}
