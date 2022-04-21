const path = require('path'),
  async = require('async'),
  newman = require('newman'),

  parametersForTestRun = {
    collection: path.join(__dirname, 'postman_collection_model2.json'),
  }

parallelCollectionRun = function (done) {
  newman.run(parametersForTestRun, done)
}

const countArg = process.argv[2]
let count = 3
if (countArg) {
  count = parseInt(countArg)
}
let tasks = Array.from({ length: count }, () => parallelCollectionRun)

const startTime = new Date()
async.parallel(tasks).then(() => {
  const endTime = new Date()
  console.log(`Массовый тест отработал за ${endTime - startTime} мс`)
})

