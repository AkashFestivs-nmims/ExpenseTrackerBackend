const { Client } = require('pg');

  const postgres = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'expenseTracker',
  });

module.exports = {postgres}