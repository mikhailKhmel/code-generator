const { GetDefaultMicroservice } = require('./default-microservice')
const fs = require('fs')
const config = require('config')

const workdir = config.get('workdir')

function Generator (elements, settings) {
  console.log('Запущена генерация')

  if (!fs.existsSync(workdir)) {
    fs.mkdirSync(workdir)
    console.log('Рабочая папка создана')
  }

  const microservices = elements.filter(x => x.type === 'microservice')
  for (let i = 0; i < microservices.length; i++) {
    console.log(`Генерация микросервиса. ID: ${microservices[i].id}, Name: ${microservices[i].data.name}, Type: ${microservices[i].data.microserviceType}`)

    if (microservices[i].data.microserviceType === 'default') {
      GetDefaultMicroservice(microservices[i].data.name, settings.find(x => x.id === microservices[i].id))
    }
  }
}

exports.Generator = Generator
