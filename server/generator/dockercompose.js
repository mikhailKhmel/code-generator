const fs = require('fs')
const config = require('config')

const service =
  `
{%servicename%}:
    container_name: {%servicename%}
    build:
      context: .
      dockerfile: {%dockerpath%}/Dockerfile
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
      - ./{%serivcename%}/migrations/dbinit.sql:/docker-entrypoint-initdb.d/dbinit.sql
    restart: always
    environment:
      POSTGRES_USER: {%username%}
      POSTGRES_PASSWORD: {%password%}
      POSTGRES_DB: {%dbname%}
{%db%}
`

function DockerCompose (uuid, microserviceSettings, databaseSettings) {
  const workdir = `${config.get('workdir')}\\${uuid}`
  fs.copyFileSync('.\\templates\\temp-docker-compose.yaml', `${workdir}\\docker-compose.yaml`)
  let dockercompose = fs.readFileSync(`${workdir}\\docker-compose.yaml`, 'utf-8')
  for (let i = 0; i < microserviceSettings.length; i++) {
    const path = `${workdir}\\${microserviceSettings[i].name}`
    let currService = service.replaceAll('{%servicename%}', microserviceSettings[i].name)
    currService = currService.replaceAll('{%dockerpath%}', path.replaceAll('\\', '/'))
    currService = currService.replaceAll('{%port%}', microserviceSettings[i].port)
    dockercompose.replace('{%service%}', currService)
  }

  for (let i = 0; i < databaseSettings.length; i++) {
    let currDb = db.replaceAll('{%dbname%}', databaseSettings[i].name)
    currDb.replaceAll('{%port%}', databaseSettings[i].port)
    currDb.replaceAll('{%username%}', databaseSettings[i].username)
    currDb.replaceAll('{%password%}', databaseSettings[i].password)
    currDb.replaceAll('{%servicename%}', microserviceSettings.find(x => x.id === databaseSettings[i].id).name)
    dockercompose.replace('{%db%}', currDb)
  }
  fs.writeFileSync(`${workdir}\\docker-compose.yaml`, dockercompose)
}

module.exports = { DockerCompose }