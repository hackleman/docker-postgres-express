const path = require('path');
const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('config');
const users = require('../routes/users');

let server;

function initialize() {

  return new Promise((resolve, reject) => {

    mongoose.connect(config.get('MongoURI'), {useNewUrlParser: true});

    // Connect to Mongoose
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });
    mongoose.connection.on('error', (err) => {
      console.log('Database error: '+err);
    });

    const app = express();

    server = http.createServer(app);

    app.use(cors());

    app.use(bodyParser.json());

    app.use('/users', users);

    if(process.env.NODE_ENV === 'production') {
      // Static files in client/build
      app.use(express.static('client/build'));

      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
      });
    }
    // app.use(express.static('client/build'));

    // app.get('*', (req, res) => {
    //   res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    // });


    // Default Database Startup message after Get '/'
    // app.get('/', async (req, res) => {
    //     res.send('Invalid Endpoint');
    // });

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log('Main server listening on localhost: ' + port);
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
