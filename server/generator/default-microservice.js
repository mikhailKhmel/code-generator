const fs = require('fs')
const config = require('config')
const cmd = require('node-cmd')

let workdir = config.get('workdir')

function GenDefaultMicroservice (name, settings) {
  workdir = `${workdir}\\${name}`
  if (!fs.existsSync(workdir)) {
    fs.mkdirSync(workdir)
  }
  const initProject = cmd.runSync(`cd ${workdir} && npm init --yes && npm i express`)

}

exports.GetDefaultMicroservice = GenDefaultMicroservice