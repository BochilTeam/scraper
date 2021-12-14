const fs = require('fs');
let dirs = fs.readdirSync('./test').filter(v => /\.js$/.test(v)).map(v => require.resolve('./' + v))
dirs.forEach(require)
