'use strict'

var express = require('express')
var morgan = require('morgan')
var cors = require('cors')
var bodyParser = require('body-parser')

//

module.exports = zeJarvisChatServer

//

function zeJarvisChatServer (initialDB, options) {
  options = options || {};

  var app = express();
  var db = initialDB || [];

  if (options.verbose) {
    app.use(morgan('dev'));
  }

  app.use(cors());
  app.use(bodyParser.json());

  app.get('/messages', function (req, res) {
    res.json(db.map(function (value, id) {
      return Object.assign({}, value, {
        _id: String(id)
      });
    }));
  });

  app.post('/messages', function (req, res) {
    var newEntry = req.body;
    newEntry.timestamp = Date.now();
    db.unshift(newEntry);
    res
      .status(201)
      .json(Object.assign({ _id: db.length }, newEntry));
  });

  return app
}
