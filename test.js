'use strict';
var assert = require('assert');
var readChunk = require('read-chunk');
var isKeyword = require('./index');

function check(token) {
  return isKeyword(token);
}

it("should report if it's a ES keyword or not", function() {
  assert(check('let'));
  assert(!check('js'));
});