const fs = require('fs')
const config = require('config')
const archiver = require('archiver');

function Dockering (uuid, name, port) {
  const workdir = `${config.get('workdir')}\\${uuid}\\${name}`

  console.log('копирование файлов')
  fs.copyFileSync('.\\templates\\.dockerignore', `${workdir}\\.dockerignore`)
  fs.copyFileSync('.\\templates\\Dockerfile', `${workdir}\\Dockerfile`)

  console.log('исправление файлов')
  let dockerfile = fs.readFileSync(`${workdir}\\Dockerfile`, 'utf-8')
  dockerfile = dockerfile.replace('{%port%}', port)
  dockerfile = dockerfile.replace('{%name%}', name)
  fs.writeFileSync(`${workdir}\\Dockerfile`, dockerfile, 'utf-8')
}

async function GenArchive (uuid) {
  console.log('архивация проекта', uuid)
  fs.mkdirSync(`${config.get('workdir')}\\archive\\${uuid}`, {recursive: true})
  console.log('создана папка', `${config.get('workdir')}\\archive\\${uuid}`)
  const archive = archiver('zip', { zlib: { level: 9 }})
  const stream = fs.createWriteStream(`${config.get('workdir')}\\archive\\${uuid}\\project.zip`);

  return new Promise((resolve, reject) => {
    archive
      .directory(`${config.get('workdir')}\\${uuid}\\`, false)
      .on('error', err => reject(err))
      .pipe(stream)
    ;

    stream.on('close', () => resolve());
    archive.finalize();
    console.log('завершение архивации')
  });
}

exports.Dockering = Dockering
exports.GenArchive = GenArchive
