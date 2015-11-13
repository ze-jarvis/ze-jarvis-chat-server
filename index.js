'use strict'

var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')

//

module.exports = zeJarvisChatServer

//

function zeJarvisChatServer (initialDB, options) {
  options = options || {}

  var app = express()
  var db = initialDB || []

  if (options.verbose) {
    app.use(morgan('dev'))
  }

  app.get('/messages', function (req, res) {
    res.json(db.map(function (value, id) {
      return Object.assign({}, value, {
        _id: String(id)
      })
    }))
  })

  app.post('/messages', bodyParser.json(), function (req, res) {
    var newEntry = req.body
    db.unshift(newEntry)
    res
      .status(201)
      .json(Object.assign({ _id: db.length }, newEntry))
  })

  return app
}
