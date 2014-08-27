(function(root, ku) {
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return ku(root);
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = ku(root);
  } else {
    root.ku = ku(root);
  }
})(this, function(root) {
  'use strict';
  var curry = function(func, expected) {
    if (expected == null) expected = fn.length;

    return function carrier() {
      var args = Array.prototype.slice.call(arguments, 0);

      if (args.length > expected) {
        var extra = args.splice(expected, args.length - expected),
            result = func.apply(null, args);

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
        return func.apply(this, args);
      } else {
        return function() {
          return carrier.apply(null, args.concat(
            Array.prototype.slice.call(arguments, 0)
          ));
        };
      }
    };
  };

  var op = function(op) {
    return curry(new Function('x,y', 'return y' + op + 'x'), 2);
  };

  var ku = function() { // ku compose function
    var args = Array.prototype.slice.call(arguments, 0);

    return function(value) {
      for (var index = args.length - 1; index + 1; index--) {
        value = args[index](value);
      }

      return value;
    };
  };

  var methods = {
    add: op('+'),
    sub: op('-'),
    mul: op('*'),
    div: op('/'),
    mod: op('%'),
    cmod: function(x, y) { return ((x % y) + y) % y; },
    and: op('&&'),
    or: op('||'),
    eq: op('==='),

    max: function(values) {
      return Math.max.apply(null, values);
    },

    min: function(values) {
      return Math.min.apply(null, values);
    },

    pluck: curry(function(attr, values) {
      return ku.map(ku.attr(attr), values);
    }),

    push: curry(function(value, values) {
      return values.concat([value]);
    }),

    attr: curry(function(attr, values) {
      return values[attr];
    }),

    zero: function(value) {
      return !!value;
    },

    not: function(value) {
      return !value;
    },

    curry: curry,

    findI: curry(function(iterator, values) {
      for (var index = 0; index < values.length; index++) {
        if (iterator(values[index])) return index;
      }
    }),

    find: curry(function(iterator, values) {
      return values[ku.findI(iterator, values)];
    }),

    take: curry(function(amount, values) {
      return values.slice(0, amount);
    }),

    drop: curry(function(amount, values) {
      return values.slice(values.length - amount);
    }),

    head: function(values) {
      return values[0];
    },

    tail: function(values) {
      return values.slice(1);
    },

    init: function(values) {
      return values.slice(0, values.length - 1);
    },

    zip: function(values) {
      var length = ku.max(ku.pluck('length', values)),
          result = [];

      for (var index = 0; index < length; index++) {
        result[index] = ku.pluck(index, values);
      }

      return result;
    },

    compo: curry(function(props, object) {
      return true; // TODO
    }),

    func: function(iterator) {
      var type = typeof iterator;

      if (type === 'function') {
        return iterator;
      } else if (type === 'string' || type === 'number') {
        return ku.attr(iterator);
      } else if (type === 'object') {
        return ku.compo(iterator);
      }
    },

    map: curry(function(iterator, values) {
      return values.map(ku.func(iterator));
    }),

    filter: curry(function(iterator, values) {
      return values.filter(ku.func(iterator));
    }),

    zipObject: curry(function(keys, values) {
      var object = {};

      for (var index = 0; index < keys.length; index++) {
        object[keys[index]] = values[index];
      }

      return object;
    }),

    wrap: curry(function(attr, value) {
      var object = {};
      object[attr] = value;
      return object;
    }),

    flip: curry(function(f, x, y) {
      return f(y, x);
    }),

    compose: curry(function(f, g, x) {
      return f(g(x));
    }),

    method: function(attr) {
      var args = Array.prototype.slice(arguments, 1);

      return function(object) {
        return object[attr] && object[attr].apply(null, args);
      };
    }
  };

  for (var method in methods) {
    ku[method] = methods[method];
  }

  ku.addf = ku.flip(ku.add);

  return ku;
});
