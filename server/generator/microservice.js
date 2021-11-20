const fs = require('fs')
const config = require('config')
const cmd = require('node-cmd')

const tempDir = '.\\templates\\'

function GenMicroservice (name, settings) {
  try {
    const workDir = `${config.get('workdir')}\\${name}`
    if (!fs.existsSync(workDir)) {
      console.log('Создаем папку микросервиса', workDir)
      fs.mkdirSync(workDir)
    }

    // генерация проекта
    console.log('генерация проекта')
    cmd.runSync(`cd ${workDir} && npm init --yes && npm i express`)

    // копирование index.js
    console.log('копирование index.js')
    fs.copyFileSync(tempDir + 'temp-index.js', `${workDir}\\index.js`)

    // установка порта
    console.log('установка порта')

    let index = fs.readFileSync(`${workDir}\\index.js`, 'utf-8')

    index = index.replace('{%port%}', settings.port)

    const req = `
app.{%type%}('{%request%}', (req, res) => {
  // your code
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

    // перезапись изменений
    console.log('содержимое index', index)
    fs.writeFile(`${workDir}\\index.js`, index, (error) => {
      if (error !== null) {
        console.log('Ошибка перезаписи изменений', error)
      }
    })

    // настройка package.json
    fs.readFile(`${workDir}\\package.json`, 'utf-8', (err, data) => {
      if (err) {
        console.log('Ошибка чтения package.json', err)
        throw err
      }
      const packagejson = JSON.parse(data)
      packagejson.scripts.start = 'node index.js'

      fs.writeFile(`${workDir}\\package.json`, packagejson, (error) => {
        if (error !== null) {
          console.log('Ошибка перезаписи изменений', error)
        }
      })
    })
  } catch (error) {
    console.log('Ошибка создания микросервиса', error)
  }
}

function CreateGatewayEdge (name, { upstreamRequest, downstreamRequest, downstreamPort }) {
  try {
    const workDir = `${config.get('workdir')}\\${name}`
    fs.readFile(`${workDir}\\index.js`, 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        throw err
      } else {
        let indexJS = data
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

        fs.writeFile(`${workDir}\\index.js`, indexJS, (error) => {
          if (error !== null) {
            console.log('Ошибка перезаписи изменений', error)
          }
        })
      }
    })
  } catch (err) {
    console.log(err)
  }
}

exports.GenMicroservice = GenMicroservice
exports.CreateGatewayEdge = CreateGatewayEdge
