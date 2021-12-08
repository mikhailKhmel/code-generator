const { GenMicroservice, CreateGatewayEdge } = require('./microservice')
const { CleanFiles } = require('./cleaner')
const { Dockering, GenArchive } = require('./docker')
const fs = require('fs')
const config = require('config')

const workdir = config.get('workdir')

async function Generator (uuid, elements, settings) {
  console.log('Запущена генерация')
  fs.mkdirSync(`${workdir}\\${uuid}`, {recursive: true})
  console.log('Рабочая папка создана')

  const microservices = elements.filter(x => x.type === 'microservice')
  for (let i = 0; i < microservices.length; i++) {
    console.log(`Генерация микросервиса. ID: ${microservices[i].id}, Name: ${microservices[i].data.name}, Type: ${microservices[i].data.microserviceType}`)
    GenMicroservice(uuid, microservices[i].data.name, settings.find(x => x.id === microservices[i].id))
  }

  const edges = elements.filter(x => x.id.includes('edge'))
  Array.prototype.forEach.call(edges, (edge) => {
    console.log('установка связи', edge)
    const sourceService = microservices.find(x => x.id === edge.source)
    const sourceSettings = settings.find(x => x.id === sourceService.id)
    const targetService = microservices.find(x => x.id === edge.target)
    const targetSettings = settings.find(x => x.id === targetService.id)
    const sourceType = sourceService.data.microserviceType
    const targetType = targetService.data.microserviceType

    if (sourceType === 'gateway' && targetType === 'default') {
      console.log('установка связи между', sourceService.data.name, targetService.data.name)
      const redirects = sourceSettings.redirects
      const includesRedirectsAndApi = redirects.filter(x => targetSettings.api.map(x => x.request).includes(x.downstreamRequest))
      Array.prototype.forEach.call(includesRedirectsAndApi, (redirect) => {
        const { upstreamRequest, downstreamRequest } = redirect
        CreateGatewayEdge(uuid, sourceService.data.name, {
          upstreamRequest,
          downstreamRequest,
          downstreamPort: targetSettings.port
        })
      })
    }
  })

  console.log('Очистка файлов')
  CleanFiles(uuid, microservices.map(x => x.data.name))

  console.log('Докер')
  microservices.forEach(x => {
    Dockering(uuid, x.data.name, settings.find(y => y.id === x.id).port)
  })
  await GenArchive(uuid)

  console.log('Всё готово!')
}

exports.Generator = Generator
