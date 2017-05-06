'use strict';
var app = require('../../server/server');
var h = require('loopback-testing-helpers')(app);

describe('Api testing', function() {
  describe('Book', function() {
    it('find()', function(done) {
      h.Book.find().expect(200).end(done);
    });
    it('findOne()', function(done) {
      h.Book.findOne({filter: {where: {name: 'Book 1'}}})
        .expect(200, done);
    });
  });
});

