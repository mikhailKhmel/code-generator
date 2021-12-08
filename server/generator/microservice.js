const fs = require('fs')
const config = require('config')
const cmd = require('node-cmd')

const tempDir = '.\\templates\\'

function GenMicroservice (uuid, name, settings) {
  try {
    const workDir = `${config.get('workdir')}\\${uuid}\\${name}`
    if (!fs.existsSync(workDir)) {
      console.log('Создаем папку микросервиса', workDir)
      fs.mkdirSync(workDir)
    }

    // генерация проекта
    console.log('генерация проекта')
    cmd.runSync(`cd ${workDir} && npm init --yes`)

    console.log('установка express')
    cmd.runSync(`cd ${workDir} npm i express`)

    // копирование index.js
    console.log('копирование index.js')
    fs.copyFileSync(tempDir + 'temp-index.js', `${workDir}\\index.js`)

    // установка порта
    console.log('установка порта')
    let index = fs.readFileSync(`${workDir}\\index.js`, 'utf-8')
    index = index.replace('{%port%}', settings.port)

    const req = `
app.{%type%}('{%request%}', (req, res) => {
  return res.status(200).json({ message: 'ok' })
})
    `

    let requests = ''

    if (settings.api) {
      console.log(settings.api)
      Array.prototype.forEach.call(settings.api, (x) => {
        requests += req
        requests = requests.replace('{%type%}', x.type)
        requests = requests.replace('{%request%}', x.request)
      })
      index = index.replace('{%api%}', requests)
    }

    index = index.replace('{%api%}', requests)

    console.log('перезапись изменений')
    fs.writeFileSync(`${workDir}\\index.js`, index)

    console.log('настройка package.json')
    const packagejson = JSON.parse(fs.readFileSync(`${workDir}\\package.json`, 'utf-8'))
    packagejson.scripts.start = 'node index.js'
    fs.writeFileSync(`${workDir}\\package.json`, JSON.stringify(packagejson), 'utf-8')
  } catch (error) {
    console.log('Ошибка создания микросервиса', error)
  }
}

function CreateGatewayEdge (uuid, name, { upstreamRequest, downstreamRequest, downstreamPort }) {
  console.log('Создание соединения')
  const workDir = `${config.get('workdir')}\\${uuid}\\${name}`
  let indexJS = fs.readFileSync(`${workDir}\\index.js`, 'utf-8')
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
  fs.writeFileSync(`${workDir}\\index.js`, indexJS, 'utf-8')
  console.log('Завершение соединения')
}

exports.GenMicroservice = GenMicroservice
exports.CreateGatewayEdge = CreateGatewayEdge
