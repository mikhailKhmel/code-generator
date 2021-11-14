export const sendRequestApi = async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
  try {
    if (body) {
      body = JSON.stringify(body)
    }
    await fetch(url, { method, body, headers })
  } catch (error) {
    console.log('ERROR', error)
  }

}