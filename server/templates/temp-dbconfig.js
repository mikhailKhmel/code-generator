const { Pool } = require('pg')

export default new Pool({
  max: 20,
  connectionString: 'postgres://{%username%}:{%password%}@localhost:{%port%}/{%dbname%}',
  idleTimeoutMillis: 30000
})
