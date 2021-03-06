const getId = (l) => {
  return l + 1
}

const getNodeTypeName = (type) => {
  switch (type) {
    case 'microservice':
      return 'Обычный Микросервис'
    case 'gateway':
      return 'Перенаправляющий Микросервис'
    case 'database':
      return 'База данных'
    case 'client':
      return 'Клиент'
    default:
      return null
  }
}

const getReactFlowTypeByCustomType = (type) => {
  switch (type) {
    case 'client':
      return 'input'
    case 'microservice':
      return 'default'
    case 'gateawy':
      return 'default'
    case 'database':
      return 'output'
    default:
      return null
  }
}

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

const getPort = (ports) => {
  const port = Math.floor(Math.random() * (5999 - 5000 + 1) + 5000)
  if (ports === undefined) {
    return port
  } else {
    if (ports.includes(port)) {
      return getPort(ports)
    } else {
      return port
    }
  }
}

export {
  getId,
  getNodeTypeName,
  getReactFlowTypeByCustomType,
  generateSqlScript,
  getPort
}
