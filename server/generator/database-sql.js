const fs = require('fs')
const config = require('config')
const cmd = require('node-cmd')

function installPg (uuid, name) {
  const workDir = `${config.get('workdir')}\\${uuid}\\${name}`
  console.log('установка pg')
  cmd.runSync(`cd ${workDir} && npm i pg`)
}

function createDbConfig (uuid, name, dbSettings) {
  const workDir = `${config.get('workdir')}\\${uuid}\\${name}`
  console.log('копирование dbconfig.js')
  fs.copyFileSync('.\\templates\\temp-dbconfig.js', `${workDir}\\dbconfig.js`)

  console.log('установка строки подключения')
  let dbconfig = fs.readFileSync(`${workDir}\\dbconfig.js`, 'utf-8')
  dbconfig = dbconfig.replace('{%username%}', dbSettings.username)
  dbconfig = dbconfig.replace('{%password%}', dbSettings.password)
  dbconfig = dbconfig.replace('{%port%}', dbSettings.port)
  dbconfig = dbconfig.replace('{%dbname%}', dbSettings.dbname)

  console.log('перезапись изменений')
  fs.writeFileSync(`${workDir}\\dbconfig.js`, dbconfig)
}

function createMigrationFile (uuid, name, script) {
  const workDir = `${config.get('workdir')}\\${uuid}\\${name}`
  fs.mkdirSync(`${workDir}\\migrations`, { recursive: true })
  fs.writeFileSync(`${workDir}\\migrations\\dbinit.sql`, script, 'utf-8')
}

module.exports = { createDbConfig, installPg, generateSqlScript, createMigrationFile }
