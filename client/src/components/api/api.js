import Download from 'downloadjs'

export async function sendRequestApi (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) {
  try {
    if (body) {
      body = JSON.stringify(body)
    }
    const res = await fetch(url, { method, body, headers })
    console.log(res)
    if (!res.ok) {
      const message = await res.json()
      return { title: message.message, description: message.error, ok: res.ok }
    } else {
      const blob = await res.blob()
      Download(blob, 'project.zip')
      console.log('after download')
      return { title: 'Успешная генерация', description: '', ok: res.ok }
    }
  } catch (error) {
    console.log('ERROR', error)
  }
}
