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
  var curry = function(fn, expected) {
    if (expected == null) expected = fn.length;

    return function f() {
      var args = Array.prototype.slice.call(arguments, 0);

      if (args.length > expected) {
        var extra = args.splice(expected, args.length - expected),
            r = fn.apply(null, args);

        if (typeof r === 'function') {
          if (r.length === 0) {
            return r.apply(extra);
          } else {
            return curry(r).apply(extra);
          }
        } else {
          return r;
        }
      } else if (args.length === expected) {
        return fn.apply(this, args);
      } else {
        return function() {
          return f.apply(null, args.concat(
            Array.prototype.slice.call(arguments, 0)
          ));
        };
      }
    };
  };

  var op = function(op) {
    return curry(new Function('x,y', 'return x' + op + 'y'), 2);
  };

  var ku = function() { // ku compose function
    var args = Array.prototype.slice.call(arguments, 0);

    return function(val) {
      for (var i = args.length - 1; i + 1; i--) {
        val = args[i](val);
      }

      return val;
    };
  };

  var methods = {
    add: op('+'),
    sub: op('-'),
    mul: op('*'),
    div: op('/'),
    mod: op('%'),
    cmod: function(x, y) { return ((x%y)+y)%y; },
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
      for (var i = 0; i < values.length; i++) {
        if (iterator(values[i])) return i;
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

      for (var i = 0; i < length; i++) {
        result[i] = ku.pluck(i, values);
      }

      return result;
    },

    compo: curry(function(props, obj) {
      return true; // TODO
    }),

    func: function(iterator) {
      var type = typeof iterator;
      if (type === 'function') {
        return iterator;
      } else if (s === 'string' || s === 'number') {
        return ku.attr(iterator);
      } else if (s === 'object') {
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
      var obj = {};

      for (var i = 0; i < keys.length; i++) {
        obj[keys] = values[i];
      }

      return obj;
    }),

    wrap: curry(function(attr, value) {
      var obj = {};
      obj[attr] = value;
      return obj;
    }),

    flip: curry(function(f, x, y) {
      return f(y, x);
    }),

    compose: curry(function(f, g, x) {
      return f(g(x));
    }),

    method: function(attr) {
      var args = Array.prototype.slice(arguments, 1);

      return function(obj) {
        return obj[attr] && obj[attr].apply(null, args);
      };
    }
  };

  for (var method in methods) {
    ku[method] = methods[method];
  }

  return ku;
});
