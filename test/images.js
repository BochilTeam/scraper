const { googleImage, pinterest, wallpaper } = require('../')

googleImage('Minecarft').then(console.log)
pinterest('Minecraft').then(console.log)
wallpaper('Minecraft').then(console.log).catch(console.error)