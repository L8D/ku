/**
 * @license
 * ku 0.1.0 <http://github.com/L8D/ku/>
 * Copyright 2014 Tenor Biel
 * Available under MIT license <http://github.com/L8D/ku/>
 */
;(function(root, ku) {
  if (typeof define === 'function' && define.amd) {
    define(ku);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = ku();
  } else {
    root.ku = ku(); // closure compiler
  }
})(this, function() {
  'use strict';
  var slice = curry.call.bind([].slice),
      nil = null;

  /** @namespace ku */

  /**
   * Similar to [ku.compose](#ku-compose) but is not curried so it will perform
   * a one-time composition stream and return a function to apply it's argument
   * to the stream.
   *
   * @constructor
   * @memberof ku
   * @param {...function} func - Right-to-left functions to be composed
   * @returns {function}
   */
  function ku(func) {
    var args = slice(arguments, 0);

    return function(value) {
      for (var index = args.length - 1; index + 1; index--) {
        value = args[index](value);
      }

      return value;
    };
  }

  /**
   * A notation for an iterator function used in methods like `find`, `filter`,
   * `map` etc.
   *
   * @see ku.func
   * @typedef {(function|string|object)} iterator
   */

  /**
   * Creates a wrapper function that performs automatic curry (keep returning
   * collector functions until it has collected enough arguments to call the
   * original function).
   *
   * On a more technical level, Takes a function and returns a carrier function
   * that will keep returning itself (the function) until it has recieved a
   * number of arguments greater than or equal to the original function's arity.
   *
   * When it has "collected" enough arguments it will apply those arguments to
   * the original function and then either return the result, or if the result
   * is a function and there are extra aguments, it will apply the extra
   * arguments to the result and return that.
   *
   * @memberof ku
   * @param {function} func - Function to be transformed
   * @param {number} [expected=func.length] - Arity of the func
   * @returns {function}
   */
  function curry(func, expected) {
    if (expected == nil) expected = func.length;

    return function carrier() {
      var args = slice(arguments, 0);

      if (args.length > expected) {
        var extra = args.splice(expected, args.length - expected),
            result = func.apply(nil, args);

        if (typeof result === 'function') {
          if (result.length === 0) {
            return result.apply(extra);
          } else {
            return curry(result).apply(extra);
          }
        } else {
          return result;
        }
      } else if (args.length === expected) {
        return func.apply(nil, args);
      } else {
        return function() {
          return carrier.apply(nil, args.concat(slice(arguments, 0)));
        };
      }
    };
  }

  function op(operator) {
    return curry(new Function('x,y', 'return y' + operator + 'x'), 2);
  }

  /**
   * Takes a number and returns it negated.
   *
   * @memberof ku
   * @param {number} x
   * @returns {number}
   */
  function negate(x) {
    return -x;
  }

  /**
   * Takes two values and returns their sum in the form of `y + x`.
   *
   * @memberof ku
   * @example
   * ku.map(ku.add('.json'), ['package', 'component', 'bower']);
   * // => ['package.json', 'component.json', 'bower.json']
   * @see addf
   * @param {(number|string)} x
   * @param {(number|string)} y
   * @returns {(number|string)}
   * @method add
   */
  var add = op('+');

  /**
   * Reversed version of [ku.add](#ku-add) for doing more efficient string
   * concatenation.
   *
   * @memberof ku
   * @example
   * var addWWW = ku.addf('www.');
   *
   * addWWW('google.com'); // => 'www.google.com'
   * @param {number} x
   * @param {number} y
   * @returns {number}
   * @method ku
   */
  var addf = flip(add);

  /**
   * Takes two numbers and returns their difference in the form of `y - x`.
   *
   * @memberof ku
   * @param {number} x
   * @param {number} y
   * @returns {number}
   * @method sub
   */
  var sub = op('-');

  /**
   * Takes two numbers and returns their product in the form of `y * x`.
   *
   * @memberof ku
   * @param {number} x
   * @param {number} y
   * @returns {number}
   * @method mul
   */
  var mul = op('*');

  /**
   * Takes two numbers and return their quotient in the form of `y / x`.
   *
   * @memberof ku
   * @param {number} x
   * @param {number} y
   * @returns {number}
   * @method div
   */
  var div = op('/');

  /**
   * Takes two numbers and returns the remainder in the form of `x % y`.
   *
   * @memberof ku
   * @param {number} x
   * @param {number} y
   * @returns {number}
   */
  function mod(x, y) {
    return x % y;
  }

  /**
   * Same as [ku.mod](#ku-mod) but return accurate modulo operation
   * in the form of `((x % y) + y) % y` to support operation on negative
   * numbers
   *
   * @memberof ku
   * @param {number} x
   * @param {number} y
   * @returns {number}
   */
  function cmod(x, y) {
    return ((x % y) + y) % y;
  }

  /**
   * Takes two values then performs an AND comparison in the form of `y && x`.
   *
   * Note that you can use this as a null-value catcher in a similar vein
   * of Haskell's `Maybe` monad, but more primitive since this is a static
   * mapping.
   *
   * @memberof ku
   * @example
   * var toBool = ku.and(true);
   * toBool(undefined); // => undefined
   * toBool(9000); // => true
   * @see ku.or
   * @param {*} x
   * @param {*} y
   * @returns {*}
   * @method and
   */
  var and = op('&&');

  /**
   * Takes two values and performs and OR comparison in the form of `y || x`.
   *
   * Note that you can use this as a default-value catcher in a similar vein
   * of Haskell's `Either` monad.
   *
   * @memberof ku
   * @example
   * // #fff is default color
   * var getColors = ku(ku.map(ku.or('#fff')), ku.pluck('color'));
   *
   * getColors([{color: '#000'}, {}, {color: '#00f'}, {color: '#f00'}, {}]);
   * // => ['#000', '#fff', '#00f', '#f00', '#fff']
   * @see ku.and
   * @param {*} x
   * @param {*} y
   * @returns {*}
   * @method or
   */
  var or = op('||');

  /**
   * Takes two values and performs a static JavaScript comparison in the form
   * of `y === x`.
   *
   * @memberof ku
   * @param {*} x
   * @param {*} y
   * @returns {*}
   * @method eq
   */
  var eq = op('===');

  /**
   * Takes an array of numbers and returns the highest value according to
   * `Math.max`.
   *
   * @memberof ku
   * @param {number[]} numbers
   * @returns {number}
   * @method max
   */
  var max = Math.max.apply.bind(Math.max, Math.max);

  /**
   * Takes an array of numbers and returns the lowest value according to
   * `Math.min`.
   *
   * @memberof ku
   * @param {number[]} numbers
   * @returns {number}
   * @method min
   */
  var min = Math.max.apply.bind(Math.min, Math.max);

  /**
   * Takes an attribute and array of values, then maps over each value and
   * returns the value of that value's attribute. This is the same as
   * `ku(ku.map, ku.attr)`.
   *
   * @memberof ku
   * @example
   * var getUsernames = ku.pluck('username');
   * getUsernames([
   *   {username: 'L8D', password: 'somepassword', id: 123},
   *   {username: 'D8I', password: 'otherpassword', id: 234},
   *   {username: 'tj', password: 'whoknows', id: 345}
   * ]);
   * // => ['L8D', 'D8I', 'tj']
   * @param {string} attr
   * @param {Object[]} values
   * @returns {Array}
   * @method pluck
   */
  var pluck = ku(map, attr);

  /**
   * Takes a single value and an array of values and returns a concatened
   * array of values with the first value pushed to the end.
   *
   * @memberof ku
   * @example
   * someEventStream.map(ku.push(Bacon.noMore));
   * @param {*} value
   * @param {Array} values
   * @returns {Array}
   */
  function push(value, values) {
    return values.concat([value]);
  }

  /**
   * Takes an attribute name and an object and returns that attribute of the
   * object.
   *
   * @memberof ku
   * @example
   * var getBanlist = ku(ku.map(ku.attr('username'),
   *                     ku.filter(ku.attr('banned'));
   *
   * getBanlist([
   *   {username: 'L8D', banned: false, id: 123},
   *   {username: 'D8I', banned: true, id: 234},
   *   {username: 'tj', banned: true, id: 345}
   * ]);
   * // => ['D8I', 'tj']
   * @param {string} attr
   * @param {Object} value
   * @returns {*}
   */
  function attr(attr, value) {
    return value[attr];
  }

  /**
   * Takes any value and returns a boolean of the double-negated value.
   *
   * @memberof ku
   * @example
   * // filter out events that have no items in their array
   * someEventStream.filter(ku(ku.zero, ku.attr('length')))
   *   .map(template)
   *   .assign($('#some-element'), 'html');
   * @param {*} value
   * @returns {boolean}
   */
  function zero(value) {
    return !!value;
  }

  /**
   * Takes any value and returns a boolean of the negated value.
   *
   * @memberof ku
   * @example
   * ku.not(true) // => false
   * @param {*} value
   * @returns {boolean}
   */
  function not(value) {
    return !value;
  }

  /**
   * Takes an iterator and an array of values, then iterates over each element
   * in that array until the iterator returns a truthy value, then returns
   * that element.
   *
   * @memberof ku
   * @param {iterator} iterator
   * @param {Array} values
   * @returns {*}
   */
  function find(iterator, values) {
    return values[findI(iterator, values)];
  }

  /**
   * Same as [ku.find](#ku-find) except it returns the index of the element
   * instead of the element itself.
   *
   * @memberof ku
   * @param {iterator} iterator
   * @param {Array} values
   * @returns {number}
   */
  function findI(iterator, values) {
    for (var index = 0; index < values.length; index++) {
      if (iterator(values[index])) return index;
    }
  }

  /**
   * Takes an amount, _n_, and an array of values then returns the first _n_
   * elements of those values.
   *
   * @memberof ku
   * @example
   * ku.take(5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
   * // => [1, 2, 3, 4, 5]
   * @param {number} amount
   * @param {Array} values
   * @returns {Array}
   */
  function take(amount, values) {
    return values.slice(0, amount);
  }

  /**
   * Takes an amount, _n_, and an array of values then returns that array
   * except for its last _n_ values.
   *
   * @memberof ku
   * @param {number} amount
   * @param {Array} values
   * @returns {Array}
   */
  function drop(amount, values) {
    return values.slice(values.length - amount);
  }

  /**
   * Takes an array of values and returns the first element of that array.
   * Same as `ku.take(1)` or `ku.attr(0)`.
   *
   * @memberof ku
   * @param {Array} values
   * @returns {*}
   */
  function head(values) {
    return values[0];
  }

  /**
   * Takes an array of values and returns that array except for the first
   * element. Same as `ku.method('slice', 1)`
   *
   * @memberof ku
   * @param {Array}
   * @return {Array}
   */
  function tail(values) {
    return values.slice(1);
  }

  /**
   * Takes an array of values and returns that array except for the last
   * element.
   *
   * @memberof ku
   * @param {Array}
   * @return {Array}
   */
  function init(values) {
    return values.slice(0, values.length - 1);
  }

  /**
   * Takes an array of arrays and returns an array of grouped elements of
   * which contains the first elements of the given arrays, the second of
   * which contains the second elements of the given arrays, and so on.
   *
   * Note that this same function can be used to unzip zipped arrays also.
   *
   * @memberof ku
   * @example
   * var a = ku.zip([['fred', 'barney'], [30, 40], [true, false]]);
   * // => [['fred', 30, true], ['barney', 40, false]]
   *
   * ku.zip(a); // => [['fred', 'barney'], [30, 40], [true, false]]
   * @param {Array} values
   * @returns {Array[]}
   */
  function zip(values) {
    var length = max(pluck('length', values)),
        result = [];

    for (var index = 0; index < length; index++) {
      result[index] = pluck(index, values);
    }

    return result;
  }

  /**
   * Takes an object of properties and an object then returns a boolean of
   * wether or not all properties of the properties object are equal to the
   * same set of properties on the given object.
   *
   * @memberof ku
   * @example
   * var firstTwoCorrect = ku.compo({foo: 1, bar: 2});
   *
   * firstTwoCorrect({foo: 1, bar: 2, baz: 3, quux: 4}); // => true
   * firstTwoCorrect({foo: 0, bar: 2}) // => false
   * firstTwoCorrect({bax: 3, quux: 4}) // => false
   * @param {Object} props
   * @param {Object} object
   * @returns {boolean}
   */
  function compo(props, object) {
    return true; // TODO
  }

  /**
   * Takes an iterator and returns the corresponding iterator callback. This
   * is used by methods like `find`, `map` and `filter` to generate their
   * iterator.
   *
   * If a string is supplied, then it uses [ku.attr](#ku-attr). Known as the
   * `_.pluck` notation in LoDash.
   *
   * If an object is supplied, then it uses [ku.combo](#ku-combo). Known as the
   * `_.where` notation in Lodash.
   *
   * If a function is supplied, then it just uses that.
   *
   * @memberof ku
   * @see iterator
   * @param {iterator} iterator
   * @returns {function}
   */
  function func(iterator) {
    var type = typeof iterator;

    if (type === 'function') {
      return iterator;
    } else if (type === 'string' || type === 'number') {
      return attr(iterator);
    } else if (type === 'object') {
      return compo(iterator);
    }
  }

  /**
   * Takes an iterator and an array of values then iterates over each value
   * and returns a array of the results of the iterator.
   *
   * @memberof ku
   * @example
   * ku.map(ku.add(1), [1, 2, 3, 4, 5]); // => [2, 3, 4, 5, 6]
   * @param {iterator} iterator
   * @param {Array} values
   * @returns {Array}
   */
  function map(iterator, values) {
    return values.map(func(iterator));
  }

  /**
   * Takes an iterator and an array of values, then returns a subset of the
   * array containing elements where the iterator returned a truthy value.
   *
   * @memberof ku
   * @example
   * var isOdd = ku(ku.eq(1), ku.mod(2));
   *
   * ku.filter(isOdd, [1, 2, 3, 4, 5]) // => [1, 3, 5]
   * @param {iterator} iterator
   * @param {Array} values
   * @returns {Array}
   */
  function filter(iterator, values) {
    return values.filter(func(iterator));
  }

  /**
   * Takes an array of keys and an array of values then returns an object
   * with properties equal to each key and value pair.
   *
   * @memberof ku
   * @example
   * ku.zipo(['foo', 'bar', 'baz', 'quux'], [1, 2, 3, 4]);
   * // => {foo: 1, bar: 2, baz: 3, quux: 4}
   * @param {string[]} keys
   * @param {Array} values
   * @returns {Object}
   */
  function zipo(keys, values) {
    var object = {};

    for (var index = 0; index < keys.length; index++) {
      object[keys[index]] = values[index];
    }

    return object;
  }

  /**
   * Takes an attribute name an a value, then returns an object with that
   * attribute equal to the value.
   *
   * @memberof ku
   * @example
   * ku.wrap('success', response); // => {success: response}
   * @param {string} attr
   * @param {*} value
   * @return {Object}
   */
  function wrap(attr, value) {
    var object = {};
    object[attr] = value;
    return object;
  }

  /**
   * Takes a function and returns a new function with its first two arguments
   * reversed.
   *
   * @memberof ku
   * @example
   * ku.add('foo', ' bar'); // => ' barfoo'
   * ku.flip(ku.add)('foo', ' bar') // => 'foo bar'
   * @param {function} func
   * @returns {function}
   */
  function flip(func, x, y) {
    return func(y, x);
  }

  /**
   * Takes two functions and returns a new function of those two functions
   * composed together.
   *
   * @memberof ku
   * @see ku
   * @example
   * ku.compose(ku.add(1), ku.sub(2))(1) // => 1 - 2 + 1 = 0
   * @param {function} func
   * @param {function} func2
   * @returns {function}
   */
  function compose(func, func2, x) {
    return func(func2(x));
  }

  /**
   * Takes an attribute and any number of arguments and returns a new
   * function that will take an object and apply the given arguments to that
   * object's attribute (method).
   *
   * @memberof ku
   * @param {string} attr
   * @param {...*} args
   * @returns {function}
   */
  function method(attr) {
    var args = slice(arguments, 1);

    return function(object) {
      return object[attr].apply(object, args);
    };
  }

  ku.curry = curry;
  ku.add = add;
  ku.addf = curry(addf);
  ku.sub = sub;
  ku.mul = mul;
  ku.div = div;
  ku.mod = mod;
  ku.cmod = cmod;
  ku.and = and;
  ku.or = or;
  ku.eq = eq;
  ku.max = max;
  ku.min = min;
  ku.pluck = curry(pluck);
  ku.push = curry(push);
  ku.attr = curry(attr);
  ku.zero = zero;
  ku.not = not;
  ku.find = curry(find);
  ku.findI = curry(findI);
  ku.take = curry(take);
  ku.drop = curry(drop);
  ku.head = head;
  ku.tail = tail;
  ku.init = init;
  ku.zip = zip;
  ku.compo = curry(compo);
  ku.func = func;
  ku.map = curry(map);
  ku.filter = curry(filter);
  ku.zipo = curry(zipo);
  ku.wrap = curry(wrap);
  ku.flip = curry(flip);
  ku.compose = curry(compose);
  ku.method = method;

  return ku;
});
