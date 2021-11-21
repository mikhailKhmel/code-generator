const download = require('downloadjs')

export async function sendRequestApi (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) {
  try {
    if (body) {
      body = JSON.stringify(body)
    }
    const res = await fetch(url, { method, body, headers })
    const blob = await res.blob()
    download(blob, 'project.tar')
  } catch (error) {
    console.log('ERROR', error)
  }
}
