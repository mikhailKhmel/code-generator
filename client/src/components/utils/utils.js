const getId = (l) => {
  return l + 1
}

const getNodeTypeName = (type) => {
  switch (type) {
    case 'microservice':
      return 'Микросервис'
    case 'queue':
      return 'Очередь'
    case 'database':
      return 'База данных'
    default:
      return null
  }
}

const getReactFlowTypeByCustomType = (type) => {
  switch (type) {
    case 'queue' || 'microservice':
      return 'default'
    case 'database':
      return 'output'
    default:
      return null
  }
}

/*
[
    {
        "name": "table1",
        "columns": [
            {
                "name": "column1",
                "type": "integer",
                "notnull": false,
                "primary": false,
                "unique": false,
                "defaultValue": ""
            },
            {
                "name": "column2",
                "type": "varchar",
                "notnull": true,
                "primary": true,
                "unique": false,
                "defaultValue": "def"
            }
        ],
        "foreignKeys": []
    },
    {
        "name": "table2",
        "columns": [
            {
                "name": "id",
                "type": "integer",
                "notnull": false,
                "primary": true,
                "unique": false,
                "defaultValue": ""
            },
            {
                "name": "name",
                "type": "integer",
                "notnull": true,
                "primary": false,
                "unique": true,
                "defaultValue": "def"
            }
        ],
        "foreignKeys": []
    }
]
*/

const generateSqlScript = (tables) => {
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
    script += tableScript.replace(', %column%', '')
  }
  return script
}

export {
  getId,
  getNodeTypeName,
  getReactFlowTypeByCustomType,
  generateSqlScript
}
