const fs = require('fs')
const config = require('config')
const archiver = require('archiver')

async function GenArchive (uuid) {
  fs.mkdirSync(`${config.get('workdir')}\\archive\\${uuid}`, { recursive: true })
  console.log('создана папка', `${config.get('workdir')}\\archive\\${uuid}`)
  const archive = archiver('zip', { zlib: { level: 9 } })
  const stream = fs.createWriteStream(`${config.get('workdir')}\\archive\\${uuid}\\project.zip`)

  return new Promise((resolve, reject) => {
    archive
      .directory(`${config.get('workdir')}\\${uuid}\\`, false)
      .on('error', err => reject(err))
      .pipe(stream)

    stream.on('close', () => resolve())
    archive.finalize()
    console.log('завершение архивации')
  })
}

exports.GenArchive = GenArchive
