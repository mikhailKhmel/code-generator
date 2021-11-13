const { Router } = require('express')
const router = Router()

// /api/generator/run
router.post('/run', async (req, res) => {
    try {
        console.log(JSON.stringify(req.body))
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

module.exports = router