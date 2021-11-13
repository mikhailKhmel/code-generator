export const withApi = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    try {
        if (body) {
            body = JSON.stringify(body)
        }
        const response = await fetch(url, {method, body, headers})
        const json = await response.json()
    }
    catch (error) {
        console.log('ERROR',error)
    }
    
}