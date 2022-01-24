const { Router } = require('express')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { Generator } = require('../generator/generator')
const router = Router()

// /api/generator/run
router.post('/run', async (req, res) => {
  try {
    const elements = req.body.elements
    const settings = req.body.settings
    console.log(elements, settings)
    if (!elements || !settings || elements.length === 0 || settings.length === 0) {
      return res.status(500).json({ message: 'Отсутствуют данные', error: 'Данные не переданы' })
    }
    const uuid = uuidv4()
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
