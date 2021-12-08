const { Router } = require('express')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { Generator } = require('../generator/generator')
const router = Router()

// /api/generator/run
router.post('/run', (req, res) => {
  try {
    const elements = req.body.elements
    const settings = req.body.settings
    const uuid = uuidv4(undefined, undefined, undefined)
    Generator(uuid, elements, settings)
      .then(() => {return res.download(path.resolve(__dirname, `..\\..\\projects\\archive\\${uuid}\\project.zip`))})
      .catch((e) => {
        return res.status(500).json({
          message: 'Что-то пошло не так',
          error: e.toString()
        })
      })
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так', error: e.toString() })
  }
})

module.exports = router
