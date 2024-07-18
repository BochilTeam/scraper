# Lyrics Scraper
[Documentation](https://bochilteam.github.io/scraper/modules/_bochilteam_scraper_lyrics.html)
## Installation
```sh
npm i @bochilteam/scraper-lyrics
```

## Usage Example
```ts
// Import module
import { lyrics, lyricsv2 } from '@bochilteam/scraper-lyrics'

const data = await lyrics('Bohemian Rhapsody')
console.log(data) // JSON
```

## Example Response
### **Lyrics**
```json
{
    "id": 85218683,
    "title": "Bohemian Rhapsody",
    "url": "https://www.musixmatch.com/lyrics/Queen/Bohemian-Rhapsody-4?utm_source=application&utm_campaign=api&utm_medium=musixmatch-community%3A1409608317702",
    "artist": "Queen",
    "album": "Stone Cold Classics",
    "albumCover": "https://s.mxmcdn.net/images-storage/albums4/6/7/4/0/5/8/43850476_800_800.jpg",
    "release": "2006-01-01T00:00:00Z",
    "spotify": "https://open.spotify.com/track/6l8GvAyoUZwWDgF1e4822w",
    "lyrics": [
        {
            "type": "header",
            "text": "verse"
        },
        {
            "type": "lyric",
            "text": "Is this the real life? Is this just fantasy?"
        },
        {
            "type": "lyric",
            "text": "Caught in a landslide, no escape from reality"
        },
        {
            "type": "lyric",
            "text": "Open your eyes, look up to the skies and see"
        },
        {
            "type": "lyric",
            "text": "I'm just a poor boy, I need no sympathy"
        },
        {
            "type": "lyric",
            "text": "Because I'm easy come, easy go"
        },
        {
            "type": "lyric",
            "text": "Little high, little low"
        },
        {
            "type": "lyric",
            "text": "Any way the wind blows doesn't really matter to me, to me"
        },
        {
            "type": "header",
            "text": "verse"
        },
        {
            "type": "lyric",
            "text": "Mama, just killed a man"
        },
        {
            "type": "lyric",
            "text": "Put a gun against his head, pulled my trigger, now he's dead"
        },
        {
            "type": "lyric",
            "text": "Mama, life had just begun"
        },
        {
            "type": "lyric",
            "text": "But now I've gone and thrown it all away"
        },
        {
            "type": "lyric",
            "text": "Mama, ooh, didn't mean to make you cry"
        },
        {
            "type": "lyric",
            "text": "If I'm not back again this time tomorrow"
        },
        {
            "type": "lyric",
            "text": "Carry on, carry on as if nothing really matters"
        },
        {
            "type": "header",
            "text": "verse"
        },
        {
            "type": "lyric",
            "text": "Too late, my time has come"
        },
        {
            "type": "lyric",
            "text": "Sends shivers down my spine, body's aching all the time"
        },
        {
            "type": "lyric",
            "text": "Goodbye, everybody, I've got to go"
        },
        {
            "type": "lyric",
            "text": "Gotta leave you all behind and face the truth"
        },
        {
            "type": "lyric",
            "text": "Mama, ooh (any way the wind blows)"
        },
        {
            "type": "lyric",
            "text": "I don't wanna die"
        },
        {
            "type": "lyric",
            "text": "I sometimes wish I'd never been born at all"
        },
        {
            "type": "header",
            "text": "verse"
        },
        {
            "type": "lyric",
            "text": "I see a little silhouetto of a man"
        },
        {
            "type": "lyric",
            "text": "Scaramouche, Scaramouche, will you do the Fandango?"
        },
        {
            "type": "lyric",
            "text": "Thunderbolt and lightning, very, very frightening me"
        },
        {
            "type": "lyric",
            "text": "(Galileo) Galileo, (Galileo) Galileo, Galileo Figaro, magnifico"
        },
        {
            "type": "lyric",
            "text": "But I'm just a poor boy, nobody loves me"
        },
        {
            "type": "lyric",
            "text": "He's just a poor boy from a poor family"
        },
        {
            "type": "lyric",
            "text": "Spare him his life from this monstrosity"
        },
        {
            "type": "header",
            "text": "hook"
        },
        {
            "type": "lyric",
            "text": "Easy come, easy go, will you let me go?"
        },
        {
            "type": "lyric",
            "text": "بِسْمِ ٱللَّٰهِ"
        },
        {
            "type": "lyric",
            "text": "No, we will not let you go (let him go)"
        },
        {
            "type": "lyric",
            "text": "بِسْمِ ٱللَّٰهِ"
        },
        {
            "type": "lyric",
            "text": "We will not let you go (let him go)"
        },
        {
            "type": "lyric",
            "text": "بِسْمِ ٱللَّٰهِ"
        },
        {
            "type": "lyric",
            "text": "We will not let you go (let me go)"
        },
        {
            "type": "lyric",
            "text": "Will not let you go (let me go)"
        },
        {
            "type": "lyric",
            "text": "Will not let you go (never, never, never, never let me go)"
        },
        {
            "type": "lyric",
            "text": "No, no, no, no, no, no, no"
        },
        {
            "type": "header",
            "text": "verse"
        },
        {
            "type": "lyric",
            "text": "Oh, mamma mia, mamma mia"
        },
        {
            "type": "lyric",
            "text": "Mamma mia, let me go"
        },
        {
            "type": "lyric",
            "text": "Beelzebub has a devil put aside for me, for me, for me"
        },
        {
            "type": "lyric",
            "text": "So you think you can stone me and spit in my eye?"
        },
        {
            "type": "lyric",
            "text": "So you think you can love me and leave me to die?"
        },
        {
            "type": "lyric",
            "text": "Oh, baby, can't do this to me, baby"
        },
        {
            "type": "lyric",
            "text": "Just gotta get out, just gotta get right outta here"
        },
        {
            "type": "header",
            "text": "bridge"
        },
        {
            "type": "lyric",
            "text": "Ooh"
        },
        {
            "type": "lyric",
            "text": "Ooh, yeah, ooh, yeah"
        },
        {
            "type": "lyric",
            "text": "Nothing really matters, anyone can see"
        },
        {
            "type": "lyric",
            "text": "Nothing really matters"
        },
        {
            "type": "lyric",
            "text": "Nothing really matters to me"
        },
        {
            "type": "header",
            "text": "outro"
        },
        {
            "type": "lyric",
            "text": "(Any way the wind blows)"
        }
    ]
}
```

### **Lyrics V2**
```json
{
    "id": 1063,
    "title": "Bohemian Rhapsody by Queen",
    "url": "https://genius.com/Queen-bohemian-rhapsody-lyrics",
    "artist": "Queen",
    "album": "A Night at the Opera",
    "albumCover": "https://images.genius.com/718de9d1fbcaae9f3c9b1bf483bfa8f1.1000x1000x1.png",
    "release": "1975-10-30T17:00:00.000Z",
    "spotify": "https://open.spotify.com/track/7tFiyTwD0nx5a1eklYtX2J",
    "youtube": "http://www.youtube.com/watch?v=fJ9rUzIMcZQ",
    "soundcloud": "https://soundcloud.com/rizky-rilos/queen-bohemian-rhapsody",
    "appleMusicPlayer": "https://genius.com/songs/1063/apple_music_player",
    "lyrics": [
        {
            "type": "header",
            "url": "https://genius.com/19351006/Queen-bohemian-rhapsody/Intro",
            "text": "[Intro]"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/31961137/Queen-bohemian-rhapsody/Is-this-the-real-life-is-this-just-fantasy",
            "text": "Is this the real life? Is this just fantasy?"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/20267951/Queen-bohemian-rhapsody/Caught-in-a-landslide-no-escape-from-reality-open-your-eyes-look-up-to-the-skies-and-see",
            "text": "Caught in a landslide, no escape from reality\nOpen your eyes, look up to the skies and see"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/20268088/Queen-bohemian-rhapsody/Im-just-a-poor-boy-i-need-no-sympathy",
            "text": "I'm just a poor boy, I need no sympathy"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/32302881/Queen-bohemian-rhapsody/Because-im-easy-come-easy-go-little-high-little-low-any-way-the-wind-blows-doesnt-really-matter-to-me-to-me",
            "text": "Because I'm easy come, easy go, little high, little low\nAny way the wind blows doesn't really matter to me, to me"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/4300814/Queen-bohemian-rhapsody/Mama-just-killed-a-man-put-a-gun-against-his-head-pulled-my-trigger-now-hes-dead-mama-life-had-just-begun-but-now-ive-gone-and-thrown-it-all-away",
            "text": "Mama, just killed a man\nPut a gun against his head, pulled my trigger, now he's dead\nMama, life had just begun\nBut now I've gone and thrown it all away"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/4301685/Queen-bohemian-rhapsody/Mama-ooh-didnt-mean-to-make-you-cry-if-im-not-back-again-this-time-tomorrow-carry-on-carry-on-as-if-nothing-really-matters",
            "text": "Mama, ooh, didn't mean to make you cry\nIf I'm not back again this time tomorrow\nCarry on, carry on as if nothing really matters"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/21319582/Queen-bohemian-rhapsody/Too-late-my-time-has-come",
            "text": "Too late, my time has come"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/32302792/Queen-bohemian-rhapsody/Sends-shivers-down-my-spine-bodys-aching-all-the-time",
            "text": "Sends shivers down my spine, body's aching all the time"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/22234095/Queen-bohemian-rhapsody/Goodbye-everybody-ive-got-to-go",
            "text": "Goodbye, everybody, I've got to go"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/21319617/Queen-bohemian-rhapsody/Gotta-leave-you-all-behind-and-face-the-truth",
            "text": "Gotta leave you all behind and face the truth"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/20268205/Queen-bohemian-rhapsody/Mama-ooh-any-way-the-wind-blows",
            "text": "Mama, ooh (Any way the wind blows)"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/32302753/Queen-bohemian-rhapsody/I-dont-wanna-die-i-sometimes-wish-id-never-been-born-at-all",
            "text": "I don't wanna die\nI sometimes wish I'd never been born at all"
        },
        {
            "type": "header",
            "url": "https://genius.com/18813245/Queen-bohemian-rhapsody/Guitar-solo",
            "text": "[Guitar Solo]"
        },
        {
            "type": "header",
            "url": "https://genius.com/32303103/Queen-bohemian-rhapsody/Verse-3",
            "text": "[Verse 3]"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/20267257/Queen-bohemian-rhapsody/I-see-a-little-silhouetto-of-a-man",
            "text": "I see a little silhouetto of a man"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/459845/Queen-bohemian-rhapsody/Scaramouche-scaramouche-will-you-do-the-fandango-thunderbolt-and-lightning-very-very-frightening-me",
            "text": "Scaramouche, Scaramouche, will you do the Fandango?\nThunderbolt and lightning, very, very frightening me"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/1114490/Queen-bohemian-rhapsody/Galileo-galileo-galileo-galileo-galileo-figaro-magnifico",
            "text": "(Galileo) Galileo, (Galileo) Galileo, Galileo Figaro magnifico"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/31960923/Queen-bohemian-rhapsody/But-im-just-a-poor-boy-nobody-loves-me",
            "text": "But I'm just a poor boy, nobody loves me"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/31960989/Queen-bohemian-rhapsody/Hes-just-a-poor-boy-from-a-poor-family",
            "text": "He's just a poor boy from a poor family"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/20268670/Queen-bohemian-rhapsody/Spare-him-his-life-from-this-monstrosity",
            "text": "Spare him his life from this monstrosity"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/7458272/Queen-bohemian-rhapsody/Easy-come-easy-go-will-you-let-me-go",
            "text": "Easy come, easy go, will you let me go?"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/1114500/Queen-bohemian-rhapsody/Bismillah-no-we-will-not-let-you-go-let-him-go-bismillah-we-will-not-let-you-go-let-him-go-bismillah-we-will-not-let-you-go-let-me-go-will-not-let-you-go-let-me-go-will-not-let-you-go-never-never-never-never-let-me-go-ah-no-no-no-no-no-no-no",
            "text": "Bismillah, no, we will not let you go\n(Let him go) Bismillah, we will not let you go\n(Let him go) Bismillah, we will not let you go\n(Let me go) Will not let you go\n(Let me go) Will not let you go\n(Never, never, never, never let me go) Ah\nNo, no, no, no, no, no, no"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/2023534/Queen-bohemian-rhapsody/Oh-mamma-mia-mamma-mia-mamma-mia-let-me-go",
            "text": "(Oh, mamma mia, mamma mia) Mamma mia, let me go"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/259501/Queen-bohemian-rhapsody/Beelzebub-has-a-devil-put-aside-for-me-for-me-for-me",
            "text": "Beelzebub has a devil put aside for me, for me, for me"
        },
        {
            "type": "header",
            "url": "https://genius.com/28816593/Queen-bohemian-rhapsody/Bridge",
            "text": "[Bridge]"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/1114508/Queen-bohemian-rhapsody/So-you-think-you-can-stone-me-and-spit-in-my-eye-so-you-think-you-can-love-me-and-leave-me-to-die",
            "text": "So you think you can stone me and spit in my eye?\nSo you think you can love me and leave me to die?"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/6731622/Queen-bohemian-rhapsody/Oh-baby-cant-do-this-to-me-baby-just-gotta-get-out-just-gotta-get-right-outta-here",
            "text": "Oh, baby, can't do this to me, baby\nJust gotta get out, just gotta get right outta here"
        },
        {
            "type": "lyric",
            "url": "https://genius.com/18435112/Queen-bohemian-rhapsody/Nothing-really-matters-anyone-can-see-nothing-really-matters-nothing-really-matters-to-me-any-way-the-wind-blows",     
            "text": "Nothing really matters, anyone can see\nNothing really matters\nNothing really matters to me\nAny way the wind blows"
        }
    ]
}
```
