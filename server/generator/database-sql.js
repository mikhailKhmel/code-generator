const fs = require('fs')
const config = require('config')
const { faker } = require('@faker-js/faker')

function installPg (uuid, name) {
  const workDir = `${config.get('workdir')}/${uuid}/${name}`
  const packagejson = JSON.parse(fs.readFileSync(`${workDir}/package.json`, 'utf-8'))
  packagejson.dependencies.pg = '^8.7.3'
  fs.writeFileSync(`${workDir}/package.json`, JSON.stringify(packagejson), 'utf-8')
  console.log('завершение установки pg')
}

function createDbConfig (uuid, name, dbSettings) {
  const workDir = `${config.get('workdir')}/${uuid}/${name}`
  console.log('копирование dbconfig.js')
  fs.copyFileSync('./templates/temp-dbconfig.js', `${workDir}/dbconfig.js`)

  console.log('установка строки подключения')
  let dbconfig = fs.readFileSync(`${workDir}/dbconfig.js`, 'utf-8')
  dbconfig = dbconfig.replace('{%username%}', dbSettings.username)
  dbconfig = dbconfig.replace('{%password%}', dbSettings.password)
  dbconfig = dbconfig.replace('{%port%}', dbSettings.port)
  dbconfig = dbconfig.replace('{%dbname%}', dbSettings.dbname)

  console.log('перезапись изменений')
  fs.writeFileSync(`${workDir}/dbconfig.js`, dbconfig)
}

function createMigrationFile (uuid, script) {
  const workDir = `${config.get('workdir')}/${uuid}`
  fs.mkdirSync(`${workDir}/migrations`, { recursive: true })
  fs.writeFileSync(`${workDir}/migrations/dbinit.sql`, script, 'utf-8')
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

  return script + '\n'
}

function getValue (dataType) {
  switch (dataType) {
    case 'integer':
      return { quotes: false, value: faker.datatype.number().toString() }
    case  'double':
      return { quotes: false, value: faker.datatype.float().toString() }
    case  'varchar(255)':
      return { quotes: true, value: faker.lorem.words(10) }
    case 'text':
      return { quotes: true, value: faker.lorem.words(10) }
    case  'boolean':
      return { quotes: false, value: faker.datatype.boolean().toString() }
    case 'timestamp':
      return { quotes: true, value: faker.datatype.datetime().toISOString().replace('T', ' ').replace('Z', '') }
    case 'uuid':
      return { quotes: true, value: faker.datatype.uuid() }
  }
}

function generateFakeData (tables) {
  console.log('генерация случайных данных')
  let inserts = []
  for (let tblIndx = 0; tblIndx < tables.length; tblIndx++) {
    const table = tables[tblIndx]
    for (let i = 0; i < table.rndValues; i++) {
      const columns = table.columns
      let insertTemplate = `insert into ${tables[tblIndx].name} (%column%)
                            values (%value%);`
      for (let columnIndx = 0; columnIndx < columns.length; columnIndx++) {
        const column = columns[columnIndx]
        let { quotes, value } = getValue(column.type)
        let insertValue = quotes ? `'${value}'` : `${value}`
        insertTemplate = insertTemplate.replace('%column%', `${column.name}, %column%`)
        insertTemplate = insertTemplate.replace('%value%', `${insertValue}, %value%`)
        if (columnIndx === columns.length - 1) {
          insertTemplate = insertTemplate.replace(', %column%', '')
          insertTemplate = insertTemplate.replace(', %value%', '')
        }
      }
      inserts.push(insertTemplate)
    }
  }
  return inserts
}

module.exports = { createDbConfig, installPg, createMigrationFile, generateSqlScript, generateFakeData }
