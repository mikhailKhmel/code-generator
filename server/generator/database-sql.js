const fs = require('fs')
const config = require('config')
const cmd = require('node-cmd')

function installPg (uuid, name) {
  cmd.runSync(`cd ${config.get('workdir')}\\${uuid}\\${name} && npm i pg`)
  console.log('завершение установки pg')
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

function generateSqlScript (tables) {
  let script = ''
  for (let i = 0; i < tables.length; i++) {
    const currTable = tables[i]
    let tableScript = `CREATE TABLE ${currTable.name} (%column%);\n`
    Array.prototype.forEach.call(currTable.columns, (column) => {
      let colStr = `${column.name} ${column.type} `
      if (column.primary) {
        colStr += 'PRIMARY KEY '
      }
      if (column.unique) {
        colStr += 'UNIQUE '
      }
      if (column.notnull) {
        colStr += 'NOT NULL '
      }
      if (column.defaultValue !== '') {
        colStr += `DEFAULT ${column.defaultValue} `
      }
      colStr += ', %column%'
      tableScript = tableScript.replace('%column%', colStr)
    })
    currTable.foreignKeys.forEach(column => {
      const colStr = `${column.name} ${column.type} REFERENCES ${column.externalTable} (${column.externalColumn}), %column%`
      tableScript = tableScript.replace('%column%', colStr)
    })
    script += tableScript.replace(', %column%', '')
  }
  return script
}

module.exports = { createDbConfig, installPg, createMigrationFile, generateSqlScript }
