#!/usr/bin/env node
'use strict'

var zeJarvisChatServer = require('../')

var app = zeJarvisChatServer([], {
  verbose: process.env.VERBOSE
})

var server = app.listen(process.env.PORT || '3000', function () {
  var location = server.address()
  console.log('Chat strorage on http://' + location.address + ':' + location.port)
})
