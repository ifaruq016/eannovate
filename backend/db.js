const knexConfig = require('knex')({
  client: 'mysql',
    connection: {
        host: 'remotemysql.com',
        user: 'L9zotZtnmt',
        password: 'SlbZ9p4jI5',
        database: 'L9zotZtnmt'
    }
});

module.exports = knexConfig;