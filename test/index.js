var test = require('tape');
var ku = require('../ku');

test('map', function(t) {
  t.plan(2);

  var res = ku.map(function(x) { return x * 3; }, [1, 2, 3]);

  t.deepEqual(res, [3, 6, 9]);

  res = ku.map(function(x) { return x * 3 }, []);

  t.deepEqual(res, []);
});

test('filter', function(t) {
  t.plan(2);

  var res = ku.filter(function(x) { return x % 2 === 0; }, [1, 2, 3, 4, 5, 6]);

  t.deepEqual(res, [2, 4, 6]);

  res = ku.filter(function(x) { return x % 2 === 0; }, []);

  t.deepEqual(res, []);
});

test('reduce', function(t) {
  t.plan(2);

  var res = ku.reduce(function(x, y) { return x + y; }, 0, [1, 2, 3]);

  t.equal(res, 6);

  res = ku.reduce(function(x, y) { return x + y; }, 0, []);

  t.equal(res, 0);
});

test('scan', function(t) {
  t.plan(2);

  var res = ku.scan(function(x, y) { return x + y; }, 0, [1, 2, 3]);

  t.deepEqual(res, [0, 1, 3, 6]);

  res = ku.scan(function(x, y) { return x + y; }, 0, []);

  t.deepEqual(res, [0]);
});

test('chain', function(t) {
  t.plan(2);

  var res = ku.chain(
    function(x) { return x; },
    [[1, 2, 3], [4], [5], [6], [], [7], [8, 9], [[10, 11], 12]]
  );

  t.deepEqual(res, [1, 2, 3, 4, 5, 6, 7, 8, 9, [10, 11], 12]);

  res = ku.chain(function(x) { return x; }, []);

  t.deepEqual(res, []);
});
