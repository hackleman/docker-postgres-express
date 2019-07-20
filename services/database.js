const path = require('path');
const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const config = require('config');
const data = require('../routes/postgres');


let server;

function initialize() {

  return new Promise((resolve, reject) => {

    const app = express();
    server = http.createServer(app);
    const port = 4000;

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true, }))
    app.use('/data', data);

    // Default Database Startup message after Get '/'
    app.get('/', async (req, res) => {
        res.json({info: 'Node.js, Express, and Postgres API'})
    });

    app.listen(port, () => {
      console.log('Postgres database listening on localhost: ' + port);
    });
  });
}

function close() {

  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;
module.exports.initialize = initialize;
