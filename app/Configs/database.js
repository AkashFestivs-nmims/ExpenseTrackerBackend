const { Client } = require('pg');
const redis = require('redis');

  const postgres = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'expenseTracker',
  });

  const redisDB = redis.createClient({
    host: 'localhost',
    port: 6379,
    password: 'yourpassword'
  });

module.exports = {postgres, redisDB }