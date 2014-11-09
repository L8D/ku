'use strict';
/* global describe, it */

var assert = require('assert');
var ku = require('../ku');

describe('map', function() {
  it('should map over a non-empty array', function() {
    var res = ku.map(timesThree, [1, 2, 3]);

    assert.deepEqual(res, [3, 6, 9]);
  });

  it('should map over an empty array', function() {
    var res = ku.map(timesThree, []);

    assert.deepEqual(res, []);
  });
});

describe('filter', function() {
  it('should filter elements from a populated array', function() {
    var res = ku.filter(isEven, [1, 2, 3, 4, 5, 6]);

    assert.deepEqual(res, [2, 4, 6]);
  });

  it('should filter elements from an empty', function() {
    var res = ku.filter(isEven, []);

    assert.deepEqual(res, []);
  });
});

describe('reduce', function() {
  it('should aggregate a value from a non-empty array', function() {
    var res = ku.reduce(sum, 0, [1, 2, 3]);

    assert.equal(res, 6);
  });

  it('should return accumulator when reducing an empty array', function() {
    var res = ku.reduce(sum, 0, []);

    assert.equal(res, 0);
  });
});

describe('scan', function() {
  it('should aggregate an array of values from a non-empty array', function() {
    var res = ku.scan(sum, 0, [1, 2, 3]);

    assert.deepEqual(res, [0, 1, 3, 6]);
  });

  it('should return accumulator when scanning an empty array', function() {
    var res = ku.scan(sum, 0, []);

    assert.deepEqual(res, [0]);
  });
});

describe('chain', function() {
  it('should map over a non-empty array and concatenate result', function() {
    var res = ku.chain(upTo, [1, 2, 3]);

    assert.deepEqual(res, [0, 1, 0, 1, 2, 0, 1, 2, 3]);
  });

  it('should map over an empty array and return it', function() {
    var res = ku.chain(upTo, []);

    assert.deepEqual(res, []);
  });
});

function isEven(x) {
  return x % 2 === 0;
}

function timesThree(x) {
  return x * 3;
}

function sum(x, y) {
  return x + y;
}

function upTo(x) {
  x += 1;
  var res = new Array(x);

  while (x--) {
    res[x] = x;
  }

  return res;
}
