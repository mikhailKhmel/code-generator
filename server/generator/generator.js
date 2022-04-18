const { GenMicroservice, CreateGatewayEdge } = require('./microservice')
const { CleanFiles } = require('./cleaner')
const { GenArchive } = require('./archive')
const { createDbConfig, installPg, createMigrationFile, generateSqlScript } = require('./database-sql')
const fs = require('fs')
const config = require('config')
const { DockerCompose } = require('./dockercompose')

const workdir = config.get('workdir')

async function Generator (uuid, elements, settings) {
  console.log(`Запущена генерация ${uuid}`)
  fs.mkdirSync(`${workdir}/${uuid}`, { recursive: true })
  console.log('Рабочая папка создана')

  const microservices = elements.filter(x => x.type === 'microservice')
  if (!microservices) {
    return { result: false, message: 'Невозможно построить приожение без микросервисов' }
  }

  for (let i = 0; i < microservices.length; i++) {
    console.log(`Генерация микросервиса. ID: ${microservices[i].id}, Name: ${microservices[i].data.name}, Type: ${microservices[i].data.microserviceType}`)
    const currSettings = settings.find(x => x.id === microservices[i].id)
    if (!currSettings) {
      return { result: false, message: 'Не найдены настройки' }
    }
    const { result, message } = GenMicroservice(uuid, microservices[i].data.name, currSettings)
    if (!result) {
      return { result, message }
    }
  }

  const edges = elements.filter(x => x.id.includes('edge'))
  edges.forEach((edge) => {
    try {
      const sourceService = elements.find(x => x.id === edge.source)
      const sourceSettings = settings.find(x => x.id === sourceService.id)
      const targetService = elements.find(x => x.id === edge.target)
      const targetSettings = settings.find(x => x.id === targetService.id)

      if (sourceService.type === 'microservice' && targetService.type === 'microservice') {
        console.log('установка связи между микросервисами', sourceService.data.name, targetService.data.name)
        const sourceType = sourceService.data.microserviceType
        const targetType = targetService.data.microserviceType
        if (sourceType === 'gateway' && targetType === 'default') {
          const redirects = sourceSettings.redirects
          const includesRedirectsAndApi = redirects.filter(x => targetSettings.api.map(x => x.request).includes(x.downstreamRequest))
          Array.prototype.forEach.call(includesRedirectsAndApi, (redirect) => {
            const { upstreamRequest, downstreamRequest } = redirect

            console.log('Создание соединения')
            CreateGatewayEdge(uuid, sourceService.data.name, {
              upstreamRequest,
              downstreamRequest,
              downstreamPort: targetSettings.port
            })
          })
        }
      } else if (sourceService.type === 'microservice' && targetService.type === 'database') {
        console.log(`установка связи между базой данных ${targetSettings.name} и микросервисом ${sourceSettings.name}`)

        console.log('установка pg')
        installPg(uuid, sourceService.data.name)

        console.log('создание dbconfig')
        createDbConfig(uuid, sourceService.data.name, {
          username: targetSettings.username,
          password: targetSettings.password,
          port: targetSettings.port,
          dbname: targetSettings.name
        })
      }
    } catch (err) {
      return { result: false, message: err }
    }
  })

  const databases = settings.filter(x => x.type === 'database')
  databases.forEach((db) => {
    let script = db.script
    if (script === '' || !script) {
      console.log('генерация SQL-скрипта')
      script = generateSqlScript(db.tables)
    }

    console.log('создание файла миграции')
    createMigrationFile(uuid, script)
  })

  console.log('Создание docker-compose')
  DockerCompose(uuid, settings.filter(x => x.type === 'microservice'), settings.filter(x => x.type === 'database'), elements.filter(x => x.id.includes('edge')))

  console.log('Очистка файлов')
  CleanFiles(uuid, microservices.map(x => x.data.name))

  console.log('архивация проекта', uuid)
  await GenArchive(uuid)

  console.log('Всё готово!')
  return { result: true, message: '' }
}

exports.Generator = Generator
