const { Router } = require('express')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const { Generator } = require('../generator/generator')
const router = Router()

// /api/generator/run
router.post('/run', async (req, res) => {
  try {
    const elements = req.body.elements
    const settings = req.body.settings
    if (!elements || !settings || elements.length === 0 || settings.length === 0) {
      return res.status(500).json({ message: 'Отсутствуют данные', error: 'Данные не переданы' })
    }
    const uuid = uuidv4()
    const { result, message } = await Generator(uuid, elements, settings)
    if (result) {
      return res.download(path.resolve(__dirname, `../../projects/archive/${uuid}/project.zip`))
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

router.get('/example', async (req, res) => {
  const fullpath = path.normalize(path.join(__dirname, '../', 'examples'))
  console.log(fullpath)
  const files = fs.readdirSync(fullpath).map((filename) => path.join(fullpath, `${filename}`))
  console.log(files)
  const rndFile = files[Math.floor(Math.random() * files.length)]
  const content = JSON.parse(fs.readFileSync(rndFile, 'utf-8'))
  return res.json(content)
})

module.exports = router
