const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'https://localhost:9200', 
  auth: {
    username: 'elastic',
    password: process.env.ELASTIC_PASSWORD 
  },
  ssl: {
    rejectUnauthorized: false 
  }
});

module.exports = client;
