const fs = require('fs')
const config = require('config')
const cmd = require('node-cmd')

let workDir = config.get('workdir')
const tempDir = '.\\templates\\'

function GenDefaultMicroservice (name, settings) {
  try {
    workDir = `${workDir}\\${name}`
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

    console.log(settings.api)

    const req = `
app.{%type%}('{%request%}', (req, res) => {
  // your code
})
    `

    let requests = ''

    if (settings.api !== undefined) {
      settings.api.foreach((x) => {
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
  } catch (error) {
    console.log('Ошибка', error)
  }
}

exports.GetDefaultMicroservice = GenDefaultMicroservice
