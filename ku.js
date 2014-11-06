/**
 * ku 0.2.0 <http://github.com/L8D/ku/>
 * @license MIT
 * @copyright (c) 2014 Tenor Biel
 */
; /* istanbul ignore next: UMD */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('ku', factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.ku = factory();
  }
})(this, function() {
  'use strict';

  /** @exports ku */
  var ku = {
    /**
     * Creates an array of values by apply the function to each element in the
     * collection.
     *
     * @example
     * ku.map(function(num) { return num * 3}, [1, 2, 3]);
     * //=> [3, 6, 9]
     * @param {function} fn - The function to iterate with
     * @param {array} data - The data to iterate over
     * @returns {array}
     */
    map: function map(fn, data) {
      var index = data.length;
      var res = new Array(index);

      while (index--) {
        res[index] = fn(data[index], index);
      }

      return res;
    },

    /**
     * Creates an array of all values that the function returns a truthy value
     * for.
     *
     * @example
     * ku.filter(function(num) { return num % 2 === 0; }, [1, 2, 3, 4, 5, 6]);
     * //=> [2, 4, 6]
     * @param {function} fn - The function to iterate with
     * @param {array} data - The data to iterate over
     * @returns {array}
     */
    filter: function filter(fn, data) {
      var index = -1;
      var length = data.length;
      var res = [];
      var rindex = -1;

      while (++index < length) {
        var value = data[index];

        if (fn(value, index)) {
          res[++rindex] = value;
        }
      }

      return res;
    },

    /**
     * Aggregates over a collection starting with a value and returning the
     * resulting value.
     *
     * @example
     * ku.reduce(function(x, y) { return x + y; }, 0, [1, 2, 3]);
     * // => (((0 + 1) + 2) + 3) => 6
     * @param {function} fn - The function to aggregate with
     * @param {*} value - The initial accumulator value
     * @param {array} data - The data to aggregate over
     * @returns {*}
     */
    reduce: function reduce(fn, value, data) {
      var index = -1;
      var length = data.length;

      while (++index < length) {
        value = fn(value, data[index]);
      }

      return value;
    },

    /**
     * Aggregates over a collection and returns an array of each intermittent
     * accumulation.
     *
     * @example
     * ku.scan(function(x, y) { return x + y; }, 0, [1, 2, 3]);
     * // => [0, 1, 3, 6]
     * @param {function} fn - The function to aggregate with
     * @param {*} value - The initial accumulator value
     * @param {array} data - The data to aggregate over
     * @returns {array}
     */
    scan: function scan(fn, value, data) {
      var index = -1;
      var length = data.length;
      var res = new Array(length + 1);
      var rindex = 0;

      res[0] = value;

      while (++index < length) {
        value = res[++rindex] = fn(value, data[index]);
      }

      return res;
    },

    /**
     * Maps over an array and concatenates the result.
     *
     * @example
     * ku.chain(function(x) { return [x, x + 1, x + 2]; }, [1, 2, 3]);
     * //=> [1, 2, 3, 2, 3, 4, 3, 4, 5]
     * @param {function} fn - The function to iterate with
     * @param {array} data - The data to iterate over
     * @returns {array}
     */
    chain: function chain(fn, data) {
      var index = -1;
      var length = data.length;
      var res = [];
      var rindex = -1;

      while (++index < length) {
        var values = fn(data[index]);

        var index2 = -1;
        var length2 = values.length;

        while (++index2 < length2) {
          res[++rindex] = values[index2];
        }
      }

      return res;
    }
  };

  return ku;
});
