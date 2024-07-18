# Youtube Scraper
Scraper Youtube data like download video Youtube

## Installation
```sh
npm i @bochilteam/scraper-youtube
```

## Usage 
Example download youtube video
```ts
// import module
import { youtubedl } from '@bochilteam/scraper-youtube'

const data = await youtubedl('https://youtu.be/iik25wqIuFo')
console.log(data) // JSON
const resolutions = Object.keys(data.video) // List of resolution/quality
console.log(resolutions) 
const url = await data.video[resolutions[0]].download() // Download '720p' video
console.log(url) // string
```
[Documentation](https://bochilteam.github.io/scraper/modules/_bochilteam_scraper_youtube.html)

## Example Response
### **Youtube Search**
```json
{
    "video": [
        {
            "videoId": "dDq_04lcfYw",
            "url": "https://www.youtube.com/watch?v=dDq_04lcfYw",
            "title": "MIPAN & ZUZUZU BERTAHAN HIDUP DI DUNIA DALAM KACA DI MINECRAFT SURVIVAL! SUSAH BANGET",
            "thumbnail": "https://i.ytimg.com/vi/dDq_04lcfYw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBv2Tw18T35eSK3LBgqWEQZs1pHyA",
            "description": "Follow AKUDAV di : ▷Instagram : https://www.instagram.com/akudav__/ ▷Roblox : kosongduasatu ▷Tiktok ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/dDq_04lcfYw/mqdefault_6s.webp?du=3000&sqp=CLjm4bQG&rs=AOn4CLA-K7i6Kz2JOOKGmhAlmr2LIYhdxQ",
            "channelName": "AKUDAV",
            "channelAvatar": "https://yt3.ggpht.com/jRK8cicakshLZO82ar_y1gss2Gg_l7tgWP814WMGs54wJIV6ydq_gLcsEwWauzdwDG1BDO9YFiU=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "19 hours ago",
            "viewH": "90,586 views",
            "view": 90586,
            "durationH": "23 minutes, 8 seconds",
            "duration": 1388
        },
        {
            "videoId": "bx2j_DSg14o",
            "url": "https://www.youtube.com/watch?v=bx2j_DSg14o",
            "title": "100 Hari Parasite Minecraft",
            "thumbnail": "https://i.ytimg.com/vi/bx2j_DSg14o/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBY4v9AvdC8BhyZ8RC3Y9Q2xZ8ZhA",
            "description": "100 Hari Parasite di Minecraft Update Honkai Star Rail sekarang guys! di versi 2.3 ini ada karakter Jade yang keren banget!",
            "movingThumbnail": "https://i.ytimg.com/an_webp/bx2j_DSg14o/mqdefault_6s.webp?du=3000&sqp=CIj24bQG&rs=AOn4CLDJwNmCfjNxHfymYTrHfZeMrcmhiA",
            "channelName": "ItsSandwich",
            "channelAvatar": "https://yt3.ggpht.com/dvQLnB24Jvs6DwlMeyAZKnFXUqZdlu2MYcb2mx42J-UtRIenMoyoPKewLfIlOz5kquTDH8R2=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "1 day ago",
            "viewH": "633,072 views",
            "view": 633072,
            "durationH": "1 hour, 30 minutes, 9 seconds",
            "duration": 5409
        },
        {
            "videoId": "t2d2-dopxDo",
            "url": "https://www.youtube.com/watch?v=t2d2-dopxDo",
            "title": "100 Hari Minecraft Raft",
            "thumbnail": "https://i.ytimg.com/vi/t2d2-dopxDo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBd-ucj5oIK4_TL3HfzsBdW_J_QeQ",
            "description": "bertahan 100 hari di minecraft raft! ini mirip series 100 hari raft tapi di minecraft survival. Jangan Lupa Download Honkai Star Rail, ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/t2d2-dopxDo/mqdefault_6s.webp?du=3000&sqp=CN7g4bQG&rs=AOn4CLCqxhwGZZkJskXFiFXy3fGwakFEVw",
            "channelName": "Kaishi",
            "channelAvatar": "https://yt3.ggpht.com/KV3d2khcj70hmpaKhNl_usmGGwxhzfSzd9KpquXQ63hiVinhiI7Lup3ik2XRaAc6o39mH8IP-3Y=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "3 weeks ago",
            "viewH": "1,367,847 views",
            "view": 1367,
            "durationH": "1 hour, 25 minutes, 31 seconds",
            "duration": 5131
        },
        {
            "videoId": "NSh5SW8jgKE",
            "url": "https://www.youtube.com/watch?v=NSh5SW8jgKE",
            "title": "Minecraft NOOB vs PRO: MODERN SECRET BASE BUILD CHALLENGE",
            "thumbnail": "https://i.ytimg.com/vi/NSh5SW8jgKE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLABZ35AcCzVGoC-CnBtGEJLCJS6Kg",
            "description": "Today, we're hosting a secret underground hideout challenge! We both have to create the most elaborate underground hideouts.",
            "movingThumbnail": "https://i.ytimg.com/an_webp/NSh5SW8jgKE/mqdefault_6s.webp?du=3000&sqp=CLfe4bQG&rs=AOn4CLCn8SuOslTCmJVWIiaRofD4piB2ew",
            "channelName": "Maizen",
            "channelAvatar": "https://yt3.ggpht.com/dDSGJenGinzCiAdj6VH0UX41ENI6oLSLRtTZDkl89WknA18hUzBN-NYVMOMvHS8kxe2uzb-M=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": false,
            "publishedTime": "1 year ago",
            "viewH": "24,949,996 views",
            "view": 24949,
            "durationH": "21 minutes, 25 seconds",
            "duration": 1285
        },
        {
            "videoId": "nLfzf2LElsA",
            "url": "https://www.youtube.com/watch?v=nLfzf2LElsA",
            "title": "Joining The Deadliest SMP (again)",
            "thumbnail": "https://i.ytimg.com/vi/nLfzf2LElsA/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IDooEzAP&rs=AOn4CLAkyVKeqJFQQNXVJhA9jHasQftExQ",
            "description": "I'm back cobble farm: https://www.youtube.com/watch?v=QJjanAVCcVw Wood farm: squilly Mossfarm: @Redstonia_ @Sam.",
            "movingThumbnail": "https://i.ytimg.com/an_webp/nLfzf2LElsA/mqdefault_6s.webp?du=3000&sqp=CMDV4bQG&rs=AOn4CLAdP2Usrr2XkZFjY3FvNVdr-Ib04Q",
            "channelName": "rekrap2",
            "channelAvatar": "https://yt3.ggpht.com/ytc/AIdro_lUZmMG2lv0gJVKEwmtsCB64BKHJDIonkuIsN45cXqMdxg=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "13 hours ago",
            "viewH": "521,996 views",
            "view": 521996,
            "durationH": "25 minutes, 8 seconds",
            "duration": 1508
        },
        {
            "videoId": "N6p_qkFJqmE",
            "url": "https://www.youtube.com/watch?v=N6p_qkFJqmE",
            "title": "Memaksa Mob Minecraft Agar Masuk Ke Sekolah",
            "thumbnail": "https://i.ytimg.com/vi/N6p_qkFJqmE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC9ku71hr3uS-3WGLca9H1-v_XfMQ",
            "description": "Teguh Sugianto main minecraft Join TeguhTeam : https://shorturl.at/kpzHT Follow Instagram ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/N6p_qkFJqmE/mqdefault_6s.webp?du=3000&sqp=CK7S4bQG&rs=AOn4CLCCQVt8r-CLmWBe3aZWyFQB7bmwqg",
            "channelName": "Teguh Sugianto",
            "channelAvatar": "https://yt3.ggpht.com/X9VJSqAirvTKAn0Q7gose4CIaT_DCvGag-HH9fxAJKBaMq0Yz9TSV2ZhqbJO3cbB2dGvdOfQikw=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "22 hours ago",
            "viewH": "105,532 views",
            "view": 105532,
            "durationH": "19 minutes, 41 seconds",
            "duration": 1181
        },
        {
            "videoId": "M34lEfPY_Nw",
            "url": "https://www.youtube.com/watch?v=M34lEfPY_Nw",
            "title": "MINECRAFT TIDAK PERNAH TERLIHAT SEHIDUP INI",
            "thumbnail": "https://i.ytimg.com/vi/M34lEfPY_Nw/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDj8XAjucRxB437Ndey5A8cfS-GxQ",
            "description": "Yuk Join Membership ! https://www.youtube.com/channel/UC7VT_xaWVmq0JvsTvCFACIg/join Hello gaes kembali lagi di channel ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/M34lEfPY_Nw/mqdefault_6s.webp?du=3000&sqp=CJzn4bQG&rs=AOn4CLBHlGvYGhjAtVjFP0zjUKNnvCI5bw",
            "channelName": "NightD",
            "channelAvatar": "https://yt3.ggpht.com/NXP2oXff8SD4Y5n9aETXzwQJ6aoXACASNz0n8bsNcXU0BYojT-IZgO5IdUcEd-lnKCS6JZFnaQ=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "16 hours ago",
            "viewH": "68,532 views",
            "view": 68532,
            "durationH": "15 minutes, 27 seconds",
            "duration": 927
        },
        {
            "videoId": "G5eBipJP9SU",
            "url": "https://www.youtube.com/watch?v=G5eBipJP9SU",
            "title": "AKU IKUT TES KEKOMPAKAN SAMA @NightD24 DI MINECRAFT!! w/@Mefelz",
            "thumbnail": "https://i.ytimg.com/vi/G5eBipJP9SU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDm7uL4xv-9kgOnpC8RJza5YsbGQQ",
            "description": "Join CreamTeam Membership: http://youtube.com/beaconcream/join Game: Minecraft Hai kawan! Hari ini aku bakal main ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/G5eBipJP9SU/mqdefault_6s.webp?du=3000&sqp=CIzy4bQG&rs=AOn4CLCtkrT3rFM8xJq2QBmtwS9WVaZxQw",
            "channelName": "BeaconCream",
            "channelAvatar": "https://yt3.ggpht.com/pfUpriMAVH2wAC5zVHbvUrGS7vd8VFQj7liEFB_7r0_bMQTvCuIqLl29IeB4VLCmy_XAgwcc3vc=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "1 day ago",
            "viewH": "140,936 views",
            "view": 140936,
            "durationH": "28 minutes, 33 seconds",
            "duration": 1713
        },
        {
            "videoId": "-BXKT8ADUp4",
            "url": "https://www.youtube.com/watch?v=-BXKT8ADUp4",
            "title": "KITA BERHASIL KABUR DARI BECKROOM TERKUTUK DI MINECRAFT!!!",
            "thumbnail": "https://i.ytimg.com/vi/-BXKT8ADUp4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB2401fDtad4ddl1T209VBcz2Yjhw",
            "description": "Stresmen main MINIGAME MINECRAFT - Subscribe guys - Jangan lupa Like - Tonton sampe habis!!! email ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/-BXKT8ADUp4/mqdefault_6s.webp?du=3000&sqp=CJDR4bQG&rs=AOn4CLBTU491jDbtfpClMt-9H76-q8fo1A",
            "channelName": "Stresmen",
            "channelAvatar": "https://yt3.ggpht.com/ytc/AIdro_nbMBSZd3nXvQ9apQIngPdP2LNtCszSXfWlrsuKEJVz5i0=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "1 day ago",
            "viewH": "122,978 views",
            "view": 122978,
            "durationH": "15 minutes, 10 seconds",
            "duration": 910
        },
        {
            "videoId": "jbqO6EaE1ZA",
            "url": "https://www.youtube.com/watch?v=jbqO6EaE1ZA",
            "title": "Surviving 500 Days on Just Dirt",
            "thumbnail": "https://i.ytimg.com/vi/jbqO6EaE1ZA/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhyIFMoKTAP&rs=AOn4CLCbDzy_QAm-iAANCZwTdmZDJ2I8pg",
            "description": "Mogswamp - 500 Days Superflat, Structures Off, Bonus Chest On Start your own Minecraft server: https://mogswamp.bloom.host/ ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/jbqO6EaE1ZA/mqdefault_6s.webp?du=3000&sqp=CODR4bQG&rs=AOn4CLC7EIxL2Q-8D41liayEIsvNt_vSig",
            "channelName": "Mogswamp",
            "channelAvatar": "https://yt3.ggpht.com/kWLeyU-QhRyHB_RL0-AxJV3V4wUTdJBsWxhv0GbHELbd52qUPWRHUc68NfruC3KnzD2991VVAw=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "1 day ago",
            "viewH": "424,580 views",
            "view": 424580,
            "durationH": "1 hour, 19 minutes, 6 seconds",
            "duration": 4746
        },
        {
            "videoId": "Heq25XnqTAE",
            "url": "https://www.youtube.com/watch?v=Heq25XnqTAE",
            "title": "I COMBINED Items in Minecraft...",
            "thumbnail": "https://i.ytimg.com/vi/Heq25XnqTAE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD4mdwqVlOzBXWcKnrRC4g4hDyyXw",
            "description": "Minecraft, But You Can COMBINE ITEMS! (Challenge) FOLLOW ME: Instagram - @wispexe Photo Instagram - @wisp.photos ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/Heq25XnqTAE/mqdefault_6s.webp?du=3000&sqp=CPnk4bQG&rs=AOn4CLDDGiBKwOm0knZwaZquCKzK-gzYyQ",
            "channelName": "Wisp",
            "channelAvatar": "https://yt3.ggpht.com/ytc/AIdro_m3yfd__d3eGrsIDoBz0Jr1Ccofxuw_SRBfOMP7q1bcPuc=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "9 hours ago",
            "viewH": "118,126 views",
            "view": 118126,
            "durationH": "22 minutes, 40 seconds",
            "duration": 1360
        },
        {
            "videoId": "sJEMGSt2vf0",
            "url": "https://www.youtube.com/watch?v=sJEMGSt2vf0",
            "title": "Saving Minecraft Seeds from Scary Myths",
            "thumbnail": "https://i.ytimg.com/vi/sJEMGSt2vf0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD6-P_yOvF7k9ja-qQDf0fd0etNgA",
            "description": "Saving Minecraft Seeds from Scary Myths SUBSCRIBE to join the Cyborg Army BANGER MERCH [coming soon hehe] ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/sJEMGSt2vf0/mqdefault_6s.webp?du=3000&sqp=CLrz4bQG&rs=AOn4CLAWqUSDchACeWa3eS-4Se_conu3Qg",
            "channelName": "Bionic",
            "channelAvatar": "https://yt3.ggpht.com/Q-FdayM2KXg-997xTz9rulG3HgBkxNJ5sIjWCphHeSraj_N74hPydwae7iRfpeOOnc75jAF2Eg=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "1 day ago",
            "viewH": "564,291 views",
            "view": 564291,
            "durationH": "20 minutes, 19 seconds",
            "duration": 1219
        },
        {
            "videoId": "uAekYuDHkms",
            "url": "https://www.youtube.com/watch?v=uAekYuDHkms",
            "title": "Zombies vs The Most Secure House - Minecraft",
            "thumbnail": "https://i.ytimg.com/vi/uAekYuDHkms/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDIpkWlSt47IWlz8c2aYgNRkNtb7Q",
            "description": "Today, we've found ourselves up against a massive horde of zombies, yikes! We only have one day to prepare our humble home ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/uAekYuDHkms/mqdefault_6s.webp?du=3000&sqp=CLHq4bQG&rs=AOn4CLDdJNgX5HSkTwW8Fz-qVmrFsrQ1iw",
            "channelName": "Maizen",
            "channelAvatar": "https://yt3.ggpht.com/dDSGJenGinzCiAdj6VH0UX41ENI6oLSLRtTZDkl89WknA18hUzBN-NYVMOMvHS8kxe2uzb-M=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": false,
            "publishedTime": "2 years ago",
            "viewH": "54,254,880 views",
            "view": 54254,
            "durationH": "16 minutes, 14 seconds",
            "duration": 974
        },
        {
            "videoId": "f_5jhr1Ni_g",
            "url": "https://www.youtube.com/watch?v=f_5jhr1Ni_g",
            "title": "Opening a SECRET 7-11 In my Minecraft House",
            "thumbnail": "https://i9.ytimg.com/vi/f_5jhr1Ni_g/hq720_custom_1.jpg?sqp=CICB4rQG-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhyIEEoOTAP&rs=AOn4CLDMNNpMxNjhwJzm532p2uy0UyIJZg",
            "description": "Check out the CHECKPOINT WEBSITE and make YOUR OWN Character!: https://checkpointmultiverse.com/ Today in the ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/f_5jhr1Ni_g/mqdefault_6s.webp?du=3000&sqp=CIj44bQG&rs=AOn4CLAYaFWFWPob_ss0FqDL0KyvLmEskg",
            "channelName": "Checkpoint",
            "channelAvatar": "https://yt3.ggpht.com/ytc/AIdro_m8vDObU6EHCxR36sjslyru58MGAW5SS-UByqQ5mXpiSQk=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "7 hours ago",
            "viewH": "27,197 views",
            "view": 27197,
            "durationH": "30 minutes, 17 seconds",
            "duration": 1817
        },
        {
            "videoId": "LSqbFHtvWSo",
            "url": "https://www.youtube.com/watch?v=LSqbFHtvWSo",
            "title": "We Summoned THE NIGHTMARE BEASTS in Minecraft...",
            "thumbnail": "https://i.ytimg.com/vi/LSqbFHtvWSo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAZgnVaaiMn9rU0jCIbqCqTYS2VpA",
            "description": "We Summoned THE NIGHTMARE BEASTS in Minecraft... Today Den, Pomni, Caine, Jax, and ragatha are having fun in minecraft ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/LSqbFHtvWSo/mqdefault_6s.webp?du=3000&sqp=CJT84bQG&rs=AOn4CLAwF6YMDAYCponMboYJ9GcO6BZIvw",
            "channelName": "AyoDenTV",
            "channelAvatar": "https://yt3.ggpht.com/ZpUZAQGeT9AmQhwP-f2FMc1LQuFV9u86THYzA4IyGV7kAhVDqIjP3WBYpQJ6Cb8WdczeSqLrbZs=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "13 hours ago",
            "viewH": "65,280 views",
            "view": 65280,
            "durationH": "39 minutes, 31 seconds",
            "duration": 2371
        },
        {
            "videoId": "y1Z-O_iGpMg",
            "url": "https://www.youtube.com/watch?v=y1Z-O_iGpMg",
            "title": "IF YOU CHOOSE THE WRONG STAIR, YOU DIE! - Minecraft",
            "thumbnail": "https://i.ytimg.com/vi/y1Z-O_iGpMg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCJ9NZojNSnvIJw7mlE0GoQRItyKQ",
            "description": "Today, five mysterious staircases have appeared, reaching into the sky! Woah, I bet there's treasure at the top! It won't be easy, but ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/y1Z-O_iGpMg/mqdefault_6s.webp?du=3000&sqp=CIDj4bQG&rs=AOn4CLCciKSfSoF-NaPcHLzbgfUQiFFnzQ",
            "channelName": "Maizen",
            "channelAvatar": "https://yt3.ggpht.com/dDSGJenGinzCiAdj6VH0UX41ENI6oLSLRtTZDkl89WknA18hUzBN-NYVMOMvHS8kxe2uzb-M=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": false,
            "publishedTime": "1 year ago",
            "viewH": "56,199,742 views",
            "view": 56199,
            "durationH": "22 minutes, 41 seconds",
            "duration": 1361
        },
        {
            "videoId": "Soex3bKmw5w",
            "url": "https://www.youtube.com/watch?v=Soex3bKmw5w",
            "title": "i Found Scary MISS DELIGHT 😱 in Minecraft | ( Part-3 )",
            "thumbnail": "https://i.ytimg.com/vi/Soex3bKmw5w/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAKL1YMIqhsz3oN-2BvzbizNo0pHA",
            "description": "i Found Scary MISS DELIGHT in Minecraft | ( Part-3 ) minecraft horror myths ny gamer minecraft horror myths in hindi minecraft ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/Soex3bKmw5w/mqdefault_6s.webp?du=3000&sqp=CMzd4bQG&rs=AOn4CLD-weMlfegYjd0tWbiZ126ZvNPNgQ",
            "channelName": "RICH GAMERZ",
            "channelAvatar": "https://yt3.ggpht.com/Hx9sZbYs1tlMIWeVcXhRC1LfwxNrzBjCTF-F6PoZ3md2vKakUeQ2Jv9VAT6nd-K7JNq76IdAPQ=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": false,
            "publishedTime": "19 hours ago",
            "viewH": "63,211 views",
            "view": 63211,
            "durationH": "26 minutes, 41 seconds",
            "duration": 1601
        },
        {
            "videoId": "N2D9TbHDeCY",
            "url": "https://www.youtube.com/watch?v=N2D9TbHDeCY",
            "title": "Minecraft: How to Build a Modern House Tutorial (Easy) #32 - Interior in Description!",
            "thumbnail": "https://i.ytimg.com/vi/N2D9TbHDeCY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGkE3cK4za0FctBHNPqjQ-im0euQ",
            "description": "If you are looking for an awesome and super simple, easy to make modern house full tutorial, this video is for you! for pocket ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/N2D9TbHDeCY/mqdefault_6s.webp?du=3000&sqp=CKTb4bQG&rs=AOn4CLAY2cuS3le4-mRQWWqiIOcZPTshzA",
            "channelName": "WiederDude",
            "channelAvatar": "https://yt3.ggpht.com/ytc/AIdro_n_upKFSX-HrVQa39GvkMOqWAj0DaIbLCyg7FEy3OmOgpM=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "3 years ago",
            "viewH": "38,471,744 views",
            "view": 38471,
            "durationH": "25 minutes, 42 seconds",
            "duration": 1542
        },
        {
            "videoId": "PO00tQcEVDI",
            "url": "https://www.youtube.com/watch?v=PO00tQcEVDI",
            "title": "Playing 100 Years of Minecraft",
            "thumbnail": "https://i.ytimg.com/vi/PO00tQcEVDI/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARgTIFkofzAP&rs=AOn4CLBwnF7ypqDyF7F_rY1daXU8QNMMVA",
            "description": "I Spent 100 Days in Minecraft's Oldest, Newest and FUTURE Versions! What would you do If you could TIME TRAVEL? Play ...",
            "movingThumbnail": "https://i.ytimg.com/an_webp/PO00tQcEVDI/mqdefault_6s.webp?du=3000&sqp=CNL44bQG&rs=AOn4CLBVWdb3ZFlc2_p7xy2PBiKrLSLl2g",
            "channelName": "EYstreem",
            "channelAvatar": "https://yt3.ggpht.com/u8YI5o1jCT3jz1I1gMLPJ1HYJGxRwZOOjiw2lU3DUhHpWMpvZ9Z3IUefGM5fusebUbolCKjs=s68-c-k-c0x00ffffff-no-rj",
            "isChannelVerified": true,
            "publishedTime": "1 day ago",
            "viewH": "266,453 views",
            "view": 266453,
            "durationH": "16 minutes, 53 seconds",
            "duration": 1013
        }
    ],
    "channel": [
        {
            "channelId": "UC1sELGmy5jp5fQUugmuYlXQ",
            "url": "https://www.youtube.com/@minecraft",
            "channelName": "@minecraft",
            "username": "@minecraft",
            "avatar": "https://yt3.ggpht.com/_DiGCcjGwJQAZ3zmlyB8TCYuA8O9tDJ9zGNysq5sR0rxwYb6SP5fW8cb3LbfcRwfui0m27oIhA=s176-c-k-c0x00ffffff-no-rj-mo",
            "isChannelVerified": true,
            "subscriberH": "13.3M subscribers",
            "description": "This is the official YouTube channel of Minecraft. We tell stories about the Minecraft Universe. ESRB Rating: Everyone 10+ with ..."
        }
    ]
}
```

### **Youtube Downloader V1**
```ts
{
  id: 'iik25wqIuFo',
  thumbnail: 'https://i.ytimg.com/vi/iik25wqIuFo/0.jpg',
  title: 'Rick roll, but with different link',
  duration: 7,
  video: {
    '360p': {
      quality: '360p',
      type: 'mp4',
      fileSizeH: '449.7 KB',
      fileSize: 449.7,
      download: [AsyncFunction (anonymous)]
    },
    '1080p': {
      quality: '1080p',
      type: 'mp4',
      fileSizeH: '1.8 MB',
      fileSize: 1800,
      download: [AsyncFunction (anonymous)]
    },
    '144p': {
      quality: '144p',
      type: 'mp4',
      fileSizeH: '201.1 KB',
      fileSize: 201.1,
      download: [AsyncFunction (anonymous)]
    },
    '720p': {
      quality: '720p',
      type: 'mp4',
      fileSizeH: '649.8 KB',
      fileSize: 649.8,
      download: [AsyncFunction (anonymous)]
    },
    auto: {
      quality: 'auto',
      type: 'mp4',
      fileSizeH: '',
      fileSize: 0,
      download: [AsyncFunction (anonymous)]
    },
    video: {
      quality: 'Video',
      type: 'mp4',
      fileSizeH: '201.1 KB',
      fileSize: 201.1,
      download: [AsyncFunction (anonymous)]
    }
  },
  audio: {
    '128kbps': {
      quality: '128kbps',
      type: 'mp3',
      fileSizeH: '115.4 KB',
      fileSize: 115.4,
      download: [AsyncFunction (anonymous)]
    }
  },
  other: {
    '144p': {
      quality: '144p',
      type: '3gp',
      fileSizeH: 'MB',
      fileSize: 0,
      download: [AsyncFunction (anonymous)]
    },
    '.m4a': {
      quality: '.m4a',
      type: 'm4a',
      fileSizeH: '115.4 KB',
      fileSize: 115.4,
      download: [AsyncFunction (anonymous)]
    },
    video: {
      quality: 'Video',
      type: 'webm',
      fileSizeH: '69.2 KB',
      fileSize: 69.2,
      download: [AsyncFunction (anonymous)]
    },
    audio: {
      quality: 'Audio',
      type: 'webm',
      fileSizeH: '114.7 KB',
      fileSize: 114.7,
      download: [AsyncFunction (anonymous)]
    }
  }
}
```
### **Youtube Downloader V2**
```ts
{
  id: 'iik25wqIuFo',
  thumbnail: 'https://i.ytimg.com/vi/iik25wqIuFo/0.jpg',
  title: 'Rick roll, but with different link',
  duration: 7,
  video: {
    '360': {
      quality: '360',
      type: 'mp4',
      fileSizeH: '336.82 KB',
      fileSize: 344907,
      download: [AsyncFunction (anonymous)]
    },
    '480': {
      quality: '480',
      type: 'mp4',
      fileSizeH: '537.41 KB',
      fileSize: 550309,
      download: [AsyncFunction (anonymous)]
    },
    '720': {
      quality: '720',
      type: 'mp4',
      fileSizeH: '944.63 KB',
      fileSize: 967303,
      download: [AsyncFunction (anonymous)]
    },
    '1080': {
      quality: '1080',
      type: 'mp4',
      fileSizeH: '1.72 MB',
      fileSize: 1808533,
      download: [AsyncFunction (anonymous)]
    }
  },
  audio: {
    '49': {
      quality: '49',
      type: 'opus',
      fileSizeH: '43 KB',
      fileSize: 44028,
      download: [AsyncFunction (anonymous)]
    },
    '65': {
      quality: '65',
      type: 'opus',
      fileSizeH: '57.48 KB',
      fileSize: 58862,
      download: [AsyncFunction (anonymous)]
    },
    '131': {
      quality: '131',
      type: 'opus',
      fileSizeH: '114.73 KB',
      fileSize: 117480,
      download: [AsyncFunction (anonymous)]
    }
  },
  other: {
    '130': {
      quality: '130',
      type: 'm4a',
      fileSizeH: '115.38 KB',
      fileSize: 118144,
      download: [AsyncFunction (anonymous)]
    },
    '360': {
      quality: '360',
      type: 'webm',
      fileSizeH: '131.96 KB',
      fileSize: 135129,
      download: [AsyncFunction (anonymous)]
    },
    '480': {
      quality: '480',
      type: 'webm',
      fileSizeH: '211.14 KB',
      fileSize: 216209,
      download: [AsyncFunction (anonymous)]
    },
    '720': {
      quality: '720',
      type: 'webm',
      fileSizeH: '365.52 KB',
      fileSize: 374290,
      download: [AsyncFunction (anonymous)]
    },
    '1080': {
      quality: '1080',
      type: 'webm',
      fileSizeH: '578.65 KB',
      fileSize: 592536,
      download: [AsyncFunction (anonymous)]
    }
  }
}
```