const fs = require('fs')
const config = require('config')

function CleanFiles (names) {
  Array.prototype.forEach.call(names, (name) => {
    const workdir = `${config.get('workdir')}\\${name}\\index.js`
    let index = fs.readFileSync(workdir, 'utf-8')
    console.log('Очистка файлов для ', name)
    index = index.replace('{%redirects%}', '')
    fs.writeFileSync(workdir, index, 'utf-8')
  })
}

exports.CleanFiles = CleanFiles
