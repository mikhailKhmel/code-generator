const fs = require('fs')
const config = require('config')
const cmd = require('node-cmd')

function Dockering (name, port) {
  // удаление предыдущих образов
  console.log('Очистка предыдущих образов')
  cmd.runSync(`docker rmi ${name}`)

  const workdir = `${config.get('workdir')}\\${name}`

  console.log('копирование файлов')
  fs.copyFileSync('.\\templates\\.dockerignore', `${workdir}\\.dockerignore`)
  fs.copyFileSync('.\\templates\\Dockerfile', `${workdir}\\Dockerfile`)

  console.log('исправление файлов')
  let dockerfile = fs.readFileSync(`${workdir}\\Dockerfile`, 'utf-8')
  dockerfile = dockerfile.replace('{%port%}', port)
  dockerfile = dockerfile.replace('{%name%}', name)
  fs.writeFileSync(`${workdir}\\Dockerfile`, dockerfile, 'utf-8')

  /*console.log(`создание образа ${name}`)
  cmd.runSync(`cd ${workdir} && docker build . -t ${name}`)*/
}

function GenArchive (names) {
  console.log('архивация образа', names)
  cmd.runSync(`cd ${config.get('workdir')} && docker save -o project.tar ${names.join(' ')}`)
}

exports.Dockering = Dockering
exports.GenArchive = GenArchive
