import Download from 'downloadjs'

export async function sendRequestApi (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) {
  try {
    if (body) {
      body = JSON.stringify(body)
    }
    const res = await fetch(url, { method, body, headers })
    if (!res.ok) {
      const message = await res.json()
      return { title: message.message, description: message.error, ok: res.ok }
    } else {
      const blob = await res.blob()
      Download(blob, 'project.zip')
      return { title: 'Успешная генерация', description: '', ok: res.ok }
    }
  } catch (error) {
    return { title: 'Ошибка запроса', description: error, ok: false }
  }
}

export async function getRandomExample () {
  const res = await fetch('/api/generator/run', {method: 'GET'})
  return await res.json()
}
