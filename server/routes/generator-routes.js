const { Router } = require('express')
const path = require('path')
const { Generator } = require('../generator/generator')
const router = Router()

// /api/generator/run
router.post('/run', (req, res) => {
  try {
    const elements = req.body.elements
    const settings = req.body.settings
    Generator(elements, settings)
    return res.download(path.resolve(__dirname, '..\\..\\project\\project.tar'))
  } catch (e) {
    return res.status(500).json({ message: 'Что-то пошло не так', error: e.toString() })
  }
})

module.exports = router
