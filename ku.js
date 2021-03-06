/**
 * ku 0.3.0-dev <http://github.com/L8D/ku/>
 * @license MIT
 * @copyright (c) 2014 Tenor Biel
 */
/* global define, exports, module */
/* istanbul ignore next */
(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define('ku', factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.ku = factory();
  }
})(this, function() {
  'use strict';

  /**
   * @exampleHelpers
   * function add(x, y) { return x + y; }
   */

  /** @exports ku */
  var ku = {
    /**
     * Creates an array of values by apply the function to each element in the
     * collection.
     *
     * @example
     * ku.map(function(num) { return num * 3 }, [1, 2, 3]);
     * // => [3, 6, 9]
     * @param {function} fn - The function to iterate with
     * @param {array} data - The data to iterate over
     * @returns {array}
     */
    map: function(fn, data) {
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
     * // => [2, 4, 6]
     * @param {function} fn - The function to iterate with
     * @param {array} data - The data to iterate over
     * @returns {array}
     */
    filter: function(fn, data) {
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
     * ku.reduce(add, '', ['foo', 'bar', 'baz']);
     * // => (('' + 'foo') + 'bar') + 'baz'
     * // => 'foobarbaz'
     * @example
     * ku.reduce(add, 'some value', []);
     * // => 'some value'
     * @param {function} fn - The function to aggregate with
     * @param {*} value - The initial accumulator value
     * @param {array} data - The data to aggregate over
     * @returns {*}
     */
    reduce: function(fn, value, data) {
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
     * ku.scan(add, 0, [1, 2, 3]);
     * // => [0, 1, 3, 6]
     * @example
     * ku.scan(add, 0, []);
     * // => [0]
     * @param {function} fn - The function to aggregate with
     * @param {*} value - The initial accumulator value
     * @param {array} data - The data to aggregate over
     * @returns {array}
     */
    scan: function(fn, value, data) {
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
     * // => [1, 2, 3, 2, 3, 4, 3, 4, 5]
     * @example
     * ku.chain(function(x) { return [[x]]; }, [1, 2, 3]);
     * // => [[1], [2], [3]]
     * @param {function} fn - The function to iterate with
     * @param {array} data - The data to iterate over
     * @returns {array}
     */
    chain: function(fn, data) {
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
    },

    /**
     * Takes the first `count` elements from an array.
     *
     * @example
     * ku.take(5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
     * //=> [1, 2, 3, 4, 5]
     * @param {number} count
     * @param {array} data
     * @returns {array}
     */
    take: function(count, data) {
      var length = data.length;
      var index = Math.min(length, count);
      var res = new Array(length - index);

      while (index--) {
        res[index] = data[index];
      }

      return res;
    },

    /**
     * Drops the first `count` elements from an array.
     *
     * @example
     * (function() {
     *   return ku.drop(0, arguments);
     * })(1, 2, 3, 4);
     * //=> [1, 2, 3, 4]
     * @param {number} count
     * @param {array} data
     * @returns {array}
     */
    drop: function(count, data) {
      var length = data.length;
      var index = Math.min(length, count);
      var res = new Array(length - index);
      index--;

      while (++index < length) {
        res[index - count] = data[index];
      }

      return res;
    },

    /**
     * Slices an array at indecies `x` and `y`.
     *
     * @example
     * ku.slice(2, 5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
     * // => [3, 4, 5]
     * @example
     * ku.slice(2, 5, []);
     * // => []
     * @param {number} x
     * @param {number} y
     * @param {array} data
     * @returns {array}
     */
    slice: function(x, y, data) {
      var length = data.length;
      var index = Math.min(x, length);
      y = Math.min(y, length);
      var res = new Array(y - index);
      index--;

      while (++index < y) {
        res[index - x] = data[index];
      }

      return res;
    },

    /**
     * Uses `fn` to zip two arrays into one new array.
     *
     * Due to performance implications and idiomaticism, zip is actually
     * zipWith because JavaScript doesn't have a standard for tuple-like
     * data structures.
     *
     * @example
     * ku.zip(add, [1, 2, 3], [4, 5, 6]);
     * // => [1 + 4, 2 + 5, 3 + 6]
     * @example
     * ku.zip(add, [], [1, 2, 3, 4]); // => []
     * ku.zip(add, [1, 2, 3, 4], []); // => []
     * @param {function} fn
     * @param {array} left
     * @param {array} right
     * @returns {array}
     */
    zip: function(fn, left, right) {
      var index = Math.min(left.length, right.length);
      var res = new Array(index);

      while (index--) {
        res[index] = fn(left[index], right[index]);
      }

      return res;
    },

    /**
     * Aggregates over a collection from right to left starting with a value
     * and returning the resulting value.
     *
     * @example
     * ku.reduceRight(add, '', ['foo', 'bar', 'baz']);
     * // => (('' + 'baz') + 'bar') + 'foo'
     * // => 'bazbarfoo'
     * @example
     * ku.reduceRight(add, 'some value', []);
     * // => 'some value'
     * @param {function} fn - The function to aggregate with
     * @param {*} value - The initial accumulator value
     * @param {array} data - The data to aggregate over
     * @returns {*}
     */
    reduceRight: function(fn, value, data) {
      var index = data.length;

      while (index--) {
        value = fn(value, data[index]);
      }

      return value;
    },

    /**
     * Aggregates over a collection from right to left and returns an array of
     * each intermittent accumulation.
     *
     * @example
     * ku.scanRight(add, 0, [1, 2, 3]);
     * // => [0, 3, 5, 6]
     * @example
     * ku.scanRight(add, 0, []);
     * // => [0]
     * @example
     * ku.scanRight(add, '', ['foo', 'bar', 'baz']);
     * // => ['', 'baz', 'bazbar', 'bazbarfoo']
     * @param {function} fn - The function to aggregate with
     * @param {*} value - The initial accumulator value
     * @param {array} data - The data to aggregate over
     * @returns {array}
     */
    scanRight: function(fn, value, data) {
      var index = data.length;
      var res = new Array(index + 1);
      var rindex = 0;

      res[0] = value;

      while (index--) {
        value = res[++rindex] = fn(value, data[index]);
      }

      return res;
    },
  };

  return ku;
});
