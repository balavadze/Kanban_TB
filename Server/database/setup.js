const { Pool } = require('pg');

//! Every person running the code will need to update username and password
const pool = new Pool({
  user: 'balavadze',
  host: 'localhost',
  database: 'mytodo',
  password: 'fusion',
  port: '5432',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
