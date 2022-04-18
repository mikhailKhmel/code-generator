const fs = require('fs')
const config = require('config')
const cmd = require('node-cmd')

function GenMicroservice (uuid, name, settings) {
  try {
    const workDir = `${config.get('workdir')}/${uuid}/${name}`
    if (!fs.existsSync(workDir)) {
      console.log('Создаем папку микросервиса', workDir)
      fs.mkdirSync(workDir)
    }

    // генерация проекта
    console.log('генерация проекта')
    cmd.runSync(`cd ${workDir} && npm init --yes`)

    console.log('установка express')
    cmd.runSync(`cd ${workDir} && npm i express`)

    // копирование index.js
    console.log('копирование index.js')
    fs.copyFileSync('./templates/temp-index.js', `${workDir}/index.js`)

    // установка порта
    console.log('установка порта')
    let index = fs.readFileSync(`${workDir}/index.js`, 'utf-8')
    index = index.replace('{%port%}', settings.port)

    const req = `
app.{%type%}('{%request%}', (req, res) => {
  return res.status(200).json({ message: 'ok' })
})
    `

    let requests = ''

    if (settings.api) {
      Array.prototype.forEach.call(settings.api, (x) => {
        requests += req
        requests = requests.replace('{%type%}', x.type)
        requests = requests.replace('{%request%}', x.request)
      })
      index = index.replace('{%api%}', requests)
    }

    index = index.replace('{%api%}', requests)

    console.log('перезапись изменений')
    fs.writeFileSync(`${workDir}/index.js`, index)

    console.log('настройка package.json')
    const packagejson = JSON.parse(fs.readFileSync(`${workDir}/package.json`, 'utf-8'))
    packagejson.scripts.start = 'node index.js'
    fs.writeFileSync(`${workDir}/package.json`, JSON.stringify(packagejson), 'utf-8')

    console.log('Докер')
    Dockering(uuid, name, settings.port)

    return { result: true, message: '' }
  } catch (error) {
    console.log('Ошибка создания микросервиса', error)
    return { result: false, message: error }
  }
}

function Dockering (uuid, name, port) {
  const workdir = `${config.get('workdir')}/${uuid}/${name}`

  console.log('копирование файлов')
  fs.copyFileSync('./templates/.dockerignore', `${workdir}/.dockerignore`)
  fs.copyFileSync('./templates/Dockerfile', `${workdir}/Dockerfile`)

  console.log('исправление файлов')
  let dockerfile = fs.readFileSync(`${workdir}/Dockerfile`, 'utf-8')
  dockerfile = dockerfile.replace('{%port%}', port)
  dockerfile = dockerfile.replace('{%name%}', name)
  fs.writeFileSync(`${workdir}/Dockerfile`, dockerfile, 'utf-8')
}

function CreateGatewayEdge (uuid, name, { upstreamRequest, downstreamRequest, downstreamPort }) {
  const workDir = `${config.get('workdir')}/${uuid}/${name}`
  let indexJS = fs.readFileSync(`${workDir}/index.js`, 'utf-8')
  let redirectStr = `
app.all('{%upstreamRequest%}', (req, res) => {
  res.redirect('http://localhost:{%downstreamPort%}{%downstreamRequest%}')
})
  
{%redirects%}
          `

  redirectStr = redirectStr.replace('{%upstreamRequest%}', upstreamRequest)
  redirectStr = redirectStr.replace('{%downstreamPort%}', downstreamPort)
  redirectStr = redirectStr.replace('{%downstreamRequest%}', downstreamRequest)

  indexJS = indexJS.replace('{%redirects%}', redirectStr)
  fs.writeFileSync(`${workDir}/index.js`, indexJS, 'utf-8')
  console.log('Завершение соединения')
}

exports.GenMicroservice = GenMicroservice
exports.CreateGatewayEdge = CreateGatewayEdge
