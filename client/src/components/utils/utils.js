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

export {
  getId,
  getNodeTypeName,
  getReactFlowTypeByCustomType
}
