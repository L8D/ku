'use strict';

var describe = require('tape-bdd');
var ku = require('../ku');

describe('map', function(it) {
  it('should map over a populated array', function(assert) {
    var res = ku.map(timesThree, [1, 2, 3]);

    assert.same(res, [3, 6, 9]);
  });

  it('should map over an empty array', function(assert) {
    var res = ku.map(timesThree, []);

    assert.same(res, []);
  });
});

describe('filter', function(it) {
  it('should filter elements from a populated array', function(assert) {
    var res = ku.filter(isEven, [1, 2, 3, 4, 5, 6]);

    assert.same(res, [2, 4, 6]);
  });

  it('should filter elements from an empty', function(assert) {
    var res = ku.filter(isEven, []);

    assert.same(res, []);
  });
});

describe('reduce', function(it) {
  it('should aggregate a value from a populated array', function(assert) {
    var res = ku.reduce(sum, 0, [1, 2, 3]);

    assert.equal(res, 6);
  });

  it('should aggregate accumulator from an empty array', function(assert) {
    var res = ku.reduce(sum, 0, []);

    assert.equal(res, 0);
  });
});

describe('scan', function(it) {
  it('should aggregate values from a populated array', function(assert) {
    var res = ku.scan(sum, 0, [1, 2, 3]);

    assert.same(res, [0, 1, 3, 6]);
  });

  it('should aggregate a single value from an empty array', function(assert) {
    var res = ku.scan(sum, 0, []);

    assert.same(res, [0]);
  });
});

describe('chain', function(it) {
  it('should bind over a populated array', function(assert) {
    var res = ku.chain(upTo, [1, 2, 3]);

    assert.same(res, [0, 1, 0, 1, 2, 0, 1, 2, 3]);
  });

  it('should bind over an empty array', function(assert) {
    var res = ku.chain(upTo, []);

    assert.same(res, []);
  });
});

describe('drop', function(it) {
  it('should drop elements over an empty array', function(assert) {
    var res = ku.drop(1, []);

    assert.same(res, []);
  });

  it('should drop elements from a populated array', function(assert) {
    var res = ku.drop(3, [1, 2, 3, 4, 5, 6]);

    assert.same(res, [4, 5, 6]);
  });

  it('should drop elements from array-like objects', function(assert) {
    var res = (function() {
      return ku.drop(2, arguments);
    })(1, 2, 3, 4, 5);

    assert.same(res, [3, 4, 5]);
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
