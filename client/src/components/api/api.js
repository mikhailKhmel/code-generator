import Download from 'downloadjs'

export async function sendRequestApi (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) {
  try {
    if (body) {
      body = JSON.stringify(body)
    }
    const res = await fetch(url, { method, body, headers })
    const blob = await res.blob()
    Download(blob, 'project.zip')
  } catch (error) {
    console.log('ERROR', error)
  }
}
