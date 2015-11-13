'use strict'

var expect = require('chai').expect
var request = require('supertest')
var zeJarvisChatServer = require('../')

var messages = [
  {user: 'Paul', text: 'Hello'}
]

describe('API', function () {
  var app

  beforeEach(function () {
    app = zeJarvisChatServer(messages)
  })

  describe('Messages', function () {
    it('GET /messages', function (done) {
      request(app)
        .get('/messages')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          expect(err).not.to.be.ok
          expect(res.body).to.eql([
            {_id: '0', user: 'Paul', text: 'Hello'}
          ])
          done()
        })
    })

    it('POST /messages', function (done) {
      var foo = {user: 'Foo', text: 'Bar'}
      request(app)
        .post('/messages')
        .send(foo)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          expect(err).not.to.be.ok
          expect(res.body).to.eql({_id: 2, user: 'Foo', text: 'Bar'})
          done()
        })
    })
  })
})
