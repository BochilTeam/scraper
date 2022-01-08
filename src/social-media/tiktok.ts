import axios, { AxiosResponse } from "axios"
import cheerio from "cheerio"

interface IresTTdl {
    author: {
        unique_id: string,
        nickname: string,
        avatar: string
    },
    description: string,
    video: {
        with_watermark: string,
        no_watermark: string,
        no_watermark_raw: string
    },
    music: string
}

export async function tiktokdl(url: string): Promise<IresTTdl | {}> {
    if (/v[tm]\.tiktok\.com/g.test(url)) {
        let res = await axios.get<string>(url)
        url = res.request.res.responseUrl
    }
    let res = await axios.get<string>(`https://api.snaptik.site/video-key?video_url=${url}`)
    let key = JSON.parse(JSON.stringify(res.data, null, 2))
    if (key.status !== 'success') throw key
    let res2 = await axios.get(`https://api.snaptik.site/video-details-by-key?key=${key.data.key}`)
    let data = JSON.parse(JSON.stringify(res2.data, null, 2))
    if (data.status !== 'success') throw data
    const results: IresTTdl = {
        author: { ...data.data.author },
        description: data.data.description,
        video: {
            with_watermark: `https://api.snaptik.site/download?key=${data.data.video.with_watermark}&type=video`,
            no_watermark: `https://api.snaptik.site/download?key=${data.data.video.no_watermark}&type=video`,
            no_watermark_raw: data.data.video.no_watermark_raw
        },
        music: `https://api.snaptik.site/download?key=${data.data.music}&type=music`
    }
    return results
}


type IresTTdlv2 = IresTTdl | { description?: void, video: { no_watermark: string, no_watermark_hd: string }, music?: void }

export async function tiktokdlv2(url: string): Promise<IresTTdlv2> {
    const params = new URLSearchParams()
    params.append('url', url)
    const { data } = await axios.post<{
        author_avatar: string,
        author_id: string,
        author_name: string,
        comment_count: number,
        create_time: string,
        id: string,
        like_count: number,
        share_count: number,
        success: boolean,
        token: string
    }>('https://api.tikmate.app/api/lookup', params, {
        headers: {
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            origin: 'https://tikmate.app',
            referer: 'https://tikmate.app/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
        }
    })
    return {
        author: {
            unique_id: data.author_id,
            nickname: data.author_name,
            avatar: data.author_avatar
        },
        video: {
            no_watermark: `https://tikmate.app/download/${data.token}/${data.id}.mp4`,
            no_watermark_hd: `https://tikmate.app/download/${data.token}/${data.id}.mp4?hd=1`
        }
    }
}
interface IresTTfyp {
    id: string,
    desc: string,
    createdTime: Date,
    video: {
        id: string,
        height: number,
        width: number,
        duration: number,
        ratio: string,
        cover: string,
        originCover: string,
        dynamicCover: string,
        playAddr: string,
        downloadAddr: string,
        shareCover: string[],
        reflowCover: string,
        bitrate: number,
        encodedType: string,
        format: string,
        videoQuality: string,
        encodeUserTag: string,
        codecType: string,
        definition: string
    },
    author: {
        id: string,
        uniqueId: string,
        nickname: string,
        avatarThumb: string,
        avatarMedium: string,
        avatarLarger: string,
        signature: string,
        verified: boolean,
        secUid: string,
        secret: boolean,
        ftc: boolean,
        relation: number,
        openFavorite: boolean,
        commentSetting: number,
        duetSetting: number,
        stitchSetting: number,
        privateAccount: boolean,
        isADVirtual: boolean
    },
    music: {
        id: string,
        title: string,
        playUrl: string,
        coverThumb: string,
        coverMedium: string,
        coverLarge: string,
        authorName: string,
        original: boolean,
        duration: number,
        album: string
    },
    challenges?: {
        id: string,
        title: string,
        desc: string,
        profileThumb: string,
        profileMedium: string,
        profileLarger: string,
        coverThumb: string,
        coverMedium: string,
        coverLarger: string,
        isCommerce: boolean
    }[],
    stats: {
        diggCount: number,
        shareCount: number,
        commentCount: number,
        playCount: number
    },
    duetInfo: {
        duetFromId: string
    },
    originalItem: boolean,
    officalItem: boolean,
    textExtra?: {
        awemeId: string,
        start: number,
        end: number,
        hashtagName: string,
        hashtagId: string,
        type: 1,
        userId: string,
        isCommerce: boolean,
        userUniqueId: string,
        secUid: string,
        subType: number
    }[],
    secret: boolean,
    forFriend: boolean,
    digged: boolean,
    itemCommentStatus: number,
    showNotPass: boolean,
    vl1: boolean,
    itemMute: boolean,
    authorStats: {
        followingCount: number,
        followerCount: number,
        heartCount: number,
        videoCount: number,
        diggCount: number,
        heart: number,
    },
    privateItem: boolean,
    duetEnabled: boolean,
    stitchEnabled: boolean,
    shareEnabled: boolean,
    isAd: boolean,
    duetDisplay: number,
    stitchDisplay: number
}

export async function tiktokfyp(): Promise<IresTTfyp[] | []> {
    const { data } = await axios.get<{ itemList: IresTTfyp[] }>(`https://t.tiktok.com/api/recommend/item_list/?aid=1988&app_name=tiktok_web&device_platform=web_pc&device_id=6982004129280116226&region=ID&priority_region=&os=windows&referer=&cookie_enabled=true&screen_width=1920&screen_height=1080&browser_language=en-US&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F96.0.4664.93+Safari%2F537.36&browser_online=true&verifyFp=verify_kx30laei_YkR2lQiI_UBWz_4MZK_ACKV_loiPDs4PyDtw&app_language=en&timezone_name=Asia%2FJakarta&is_page_visible=true&focus_state=true&is_fullscreen=false&history_len=2&battery_info=%7B%7D&count=30&itemID=1&language=en&from_page=fyp&insertedItemID=&versions=70232694,70338434,70001178,70138197,70156809&msToken=Wi63JD_P7xxD_7pFmaF_UcHM6oJwSKjR9wnfsMUaDdz51KLZ3J8tazDrcY2gh_t3PyG_5926qyw8g7DhrgFa3mbDmxLhzmLs_3l_sOk4zf6TdMqfAT51s_n8ZPG8vovv76h1kCkR&X-Bogus=DFSzswVOAxxANJf/SEhC1eM/W7oh&_signature=`)
    return (data.itemList as IresTTfyp[]) || []
}

// export async function tiktokstalk(name: string): Promise<{
//     username: string;
//     profile: string;
//     avatar: string;
//     verified: boolean;
//     following: string;
//     followers: string;
//     likes: string;
//     description: string;
// }> {
//     const { data } = await axios.get(`https://www.tiktok.com/@${name}?lang=en`, {
//         headers: {
//             accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//             cookie: 'tt_csrf_token=hlVsM4KILUl4mGcUkB6w6FJR; s_v_web_id=verify_kx30laei_YkR2lQiI_UBWz_4MZK_ACKV_loiPDs4PyDtw; ttwid=1%7CY1AOcjfoIgvlYizkFtt8slCK0i4qZqApyt2VHzQW2jY%7C1639301134%7C43c115b2541a4ae28ba3b0f194641f223a4a3b18a3fcf83212c133eaf4518b04; msToken=9Ac544Pz7Cc_nUXjNNhx8MBVx96CEeL0mgtWiPUQ5Ef3XxRI81YIpRNDkWa3TM5mqAFr-rhaNE1HWEXop_kpLp4BTCqhLQdu3ppGSbLHhUnqEKmzpF86bWvmur5xyKDCVmE63Q==',
//             'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36'
//         }
//     })
//     const $ = cheerio.load(data)
//     let container = $('div.share-title-container > h2')
//     let username = container.text()?.trim()
//     let avatar = $('span.tiktok-avatar.tiktok-avatar-circle.avatar > img').attr('src')
//     let verified = /verified$/.test(container.attr('class'))
//     let profile = $('h1.share-sub-title > span.profile').text()?.trim()
//     let stats = $('h2.count-infos > div.number')
//     let following = stats.eq(0).find('strong').text()?.trim()
//     let followers = stats.eq(1).find('strong').text()?.trim()
//     let likes = stats.eq(2).find('strong').text()?.trim()
//     let description = $('h2.share-desc').text()?.trim()
//     return {
//         username,
//         profile,
//         avatar,
//         verified,
//         following,
//         followers,
//         likes,
//         description
//     }
// }

// export async function tiktoksearch(query: string) {
//     const { data } = await axios.get(`https://www.tiktok.com/search?q=${query}&t=${+new Date()}`)
//     const $ = cheerio.load(data)
// }