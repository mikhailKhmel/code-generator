const { Router } = require('express')
const { Generator } = require('../generator/generator')
const router = Router()

// /api/generator/run
router.post('/run', async (req, res) => {
  try {
    console.log(req.body)
    const elements = req.body.elements
    const settings = req.body.settings
    await Generator(elements, settings)

    return res.status(201).json({ message: 'Всё ок' })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так', error: e.toString() })
  }
})

module.exports = router
