# Tiktok Scraper
Module to download content from Tiktok
[Documentation](https://bochilteam.github.io/scraper/modules/_bochilteam_scraper_instagram.html)

## Installation
```sh
npm i @bochilteam/scraper-tiktok
```

## Usage 
Example download Instagram video
```ts
// import module
import { tiktokdl } from '@bochilteam/scraper-tiktok'

const data = await tiktokdl('https://www.instagram.com/reel/CxSEjxfyJtN')
console.log(data) // JSON
```

## Example Response
### Tiktok Downloader 
```json
{
    "nickname": "OMAGAD😱",
    "username": "@omagadsus",
    "avatar": "https://p16-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/6763d90411cd1ca9e4add19365819964~tplv-tiktokx-cropcenter-q:100:100:q75.jpeg?pack_by_platform=true&ps=124&s=AWEME_DETAIL&sc=avatar&shcp=1d1a97fc&shp=45126217&t=1",
    "description": "Rick roll 😱#fyp #foryoupage #meme #sus #rickroll #superidol #😱😱😱😱😱😱😱😱😱😱",
    "thumbnail": "https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-p-0037-aiso/2d169e8958e044288037118d5f9592dc_1635741533~tplv-tiktokx-360p.webp?lk3s=d05b14bd&nonce=47103&refresh_token=5339c138944d09be217d01c4c943d2ab&x-expires=1721012400&x-signature=vFCY7W1ZrMalIAYyktz1FJGTIqA%3D&s=AWEME_DETAIL&se=false&sh=&sc=feed_cover&l=2024071403435172D12EC127FE45BE85F8&shp=d05b14bd&shcp=-",
    "played": "1.2M",
    "commented": "3333",
    "saved": "5428",
    "shared": "12.1K",
    "song": "Quang khuất bị ngu - Duy Anh Nhái Superidol kiểu",
    "video": {
        "noWatermark": "https://v16.tiktokcdn.com/0328ccb880c55d262a3dced2fbca83f0/66939dea/video/tos/useast2a/tos-useast2a-pve-0037-aiso/386945f914fd4802b14270d18bba7321/?a=1233&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&ch=0&cr=13&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C&cv=1&br=2384&bt=1192&cs=0&ds=6&ft=pfus3MZj8Zmo05j-c-4jV9uA2KFrKsd.&mime_type=video_mp4&qs=0&rc=ZGlnM2g6PDY2aTZpODlmOUBpMzNwZjo6ZmlwODMzZjgzM0AwX2IyXmIwXjIxLl9eNC8wYSNqXl4xcjRfcnNgLS1kL2Nzcw%3D%3D&vvpl=1&l=2024071403435172D12EC127FE45BE85F8&btag=e00088000&cc=2",
        "withWatermark": "https://v16.tiktokcdn.com/dff0c43beda190e95038fa4c0e8b61f5/66939dea/video/tos/maliva/tos-maliva-ve-0068c801-us/oQaJsVgEhezAfeRf2jExMCJ8HDIGrEQBIzhAtl/?a=1233&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&ch=0&cr=13&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C&cv=1&br=2226&bt=1113&cs=0&ds=3&ft=pfus3MZj8Zmo05j-c-4jV9uA2KFrKsd.&mime_type=video_mp4&qs=0&rc=NTw0aTgzZjw4Nmg5ZTQ5aEBpMzNwZjo6ZmlwODMzZjgzM0BeMTIxMjBjNTYxYDReMDQyYSNqXl4xcjRfcnNgLS1kL2Nzcw%3D%3D&vvpl=1&l=2024071403435172D12EC127FE45BE85F8&btag=e00088000&cc=2"
    },
    "audio": "https://sf16-ies-music.tiktokcdn.com/obj/ies-music-aiso/7018923958166752027.mp3"
}
```