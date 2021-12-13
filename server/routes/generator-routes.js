const { Router } = require('express')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { Generator } = require('../generator/generator')
const router = Router()

// /api/generator/run
router.post('/run', async (req, res) => {
  try {
    const json = JSON.parse(await fs.readFileSync('config\\курсовая.json', 'utf8'))
    const elements = json.elements
    const settings = json.settings
    const uuid = uuidv4(undefined, undefined, undefined)
    const { result, message } = await Generator(uuid, elements, settings)
    if (result) {
      return res.download(path.resolve(__dirname, `..\\..\\projects\\archive\\${uuid}\\project.zip`))
    } else {
      console.log(message)
      return res.status(204).json({
        message: message
      })
    }
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так', error: e.toString() })
  }
})

module.exports = router
