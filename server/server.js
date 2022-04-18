const express = require('express')
const config = require('config')
const app = express()

const fs = require('fs')
const path = require('path')
const logpath = path.isAbsolute(config.get('logfile')) ? config.get('logfile') : __dirname

const log_file = fs.createWriteStream(path.join(logpath, 'debug.log'), { flags: 'w' })
const log_stdout = process.stdout

console.log = function (d) {
  const line = new Date().toISOString().replace(/T/, ' ').replace('Z', '') + '\t' + d + '\n'
  log_file.write(line)
  log_stdout.write(line)
}

app.use(express.json({ extended: true }))
app.use('/api/generator', require('./routes/generator-routes'))

const PORT = config.get('port') || 5000

app.listen(PORT, () => {
  console.log(`App has been started on port ${PORT}...`)
})
