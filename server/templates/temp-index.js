const express = require('express')

const app = express()

const PORT = {%port%}

{%api%}

app.listen(PORT, () => {
  console.log(`App has been started on port ${PORT}...`)
})