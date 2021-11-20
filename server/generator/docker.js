const fs = require('fs')
const config = require('config')
const cmd = require('node-cmd')

function Dockering (name, port) {
  // удаление предыдущих образов
  console.log('Очистка предыдущих образов')
  cmd.runSync(`docker rmi ${name}`)

  const workdir = `${config.get('workdir')}\\${name}`

  // копирование файлов
  fs.copyFileSync('.\\templates\\.dockerignore', `${workdir}\\.dockerignore`)
  fs.copyFileSync('.\\templates\\Dockerfile', `${workdir}\\Dockerfile`)

  // исправление файлов
  let dockerfile = fs.readFileSync(`${workdir}\\Dockerfile`, 'utf-8')
  dockerfile = dockerfile.replace('{%port%}', port)
  dockerfile = dockerfile.replace('{%name%}', name)
  fs.writeFileSync(`${workdir}\\Dockerfile`, dockerfile, 'utf-8')

  // создание образа
  cmd.runSync(`cd ${workdir} && docker build . -t ${name}`)
}

exports.Dockering = Dockering
