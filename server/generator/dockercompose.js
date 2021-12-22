const fs = require('fs')
const config = require('config')

const service =
  `
  {%servicename%}:
    container_name: {%servicename%}
    build:
      context: .
      dockerfile: ./{%dockerpath%}/Dockerfile
    depends_on:
      - postgres
    environment:
      NODE_ENV: development
      PORT: {%port%}
    ports:
      - "{%port%}:{%port%}"
  {%service%}
`

const db =
  `
  {%dbname%}:
    container_name: postgres
    image: postgres:14.1
    ports:
      - "{%port%}:5432"
    volumes:
      - ./postgresdata:/var/lib/postgresql/data
      - ./{%servicename%}/migrations/dbinit.sql:/docker-entrypoint-initdb.d/dbinit.sql
    restart: always
    environment:
      POSTGRES_USER: {%username%}
      POSTGRES_PASSWORD: {%password%}
      POSTGRES_DB: {%dbname%}
  {%db%}
`
if (!String.prototype.replaceAll) {
  /* eslint no-extend-native: ["error", { "exceptions": ["String"] }] */
  String.prototype.replaceAll =
    function replaceAll (search, replace) {
      return this.split(search).join(replace)
    }
}

function DockerCompose (uuid, microserviceSettings, databaseSettings, edges) {
  const workdir = `${config.get('workdir')}\\${uuid}`

  console.log('копирование шаблона temp-docker-compose.yaml')
  fs.copyFileSync('.\\templates\\temp-docker-compose.yaml', `${workdir}\\docker-compose.yaml`)

  console.log('чтение docker-compose')
  let dockercompose = fs.readFileSync(`${workdir}\\docker-compose.yaml`, 'utf-8')

  console.log('установка настроек сервисов')
  for (let i = 0; i < microserviceSettings.length; i++) {
    const path = `${microserviceSettings[i].name}`
    let currService = service.replaceAll('{%servicename%}', microserviceSettings[i].name.toLowerCase())
    currService = currService.replaceAll('{%dockerpath%}', path.replaceAll('\\', '/'))
    currService = currService.replaceAll('{%port%}', microserviceSettings[i].port)
    dockercompose = dockercompose.replace('{%service%}', currService)
  }

  console.log('установка настроек баз данных')
  for (let i = 0; i < databaseSettings.length; i++) {
    let currDb = db.replaceAll('{%dbname%}', databaseSettings[i].name)
    currDb = currDb.replaceAll('{%port%}', databaseSettings[i].port)
    currDb = currDb.replaceAll('{%username%}', databaseSettings[i].username)
    currDb = currDb.replaceAll('{%password%}', databaseSettings[i].password)
    currDb = currDb.replaceAll('{%servicename%}', microserviceSettings.find(x =>
      x.id === (edges.find(x =>
        x.target === databaseSettings[i].id)).source).name)
    dockercompose = dockercompose.replace('{%db%}', currDb)
  }

  console.log('запись docker-compose')
  fs.writeFileSync(`${workdir}\\docker-compose.yaml`, dockercompose)
}

module.exports = { DockerCompose }
