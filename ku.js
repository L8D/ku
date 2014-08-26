(function(root, ku) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore'], function(_) {
      return ku(root, _);
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    var _ = require('underscore');
    exports = module.exports = ku(root, _);
  } else {
    root.ku = ku(root, _);
  }
})(this, function(root, _) {
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
    return curry(new Function('x,y', 'return x' + op +'y'), 2);
  };

  var w1 = function(exp) {
    return new Function('x', 'return ' + exp);
  };

  var w2 = function(exp) {
    return curry(new Function('x,y', 'return ' + exp), 2);
  };

  var ku = {
    add: op('+'),
    sub: op('-'),
    mul: op('*'),
    div: op('/'),
    mod: op('%'),
    cmod: w2('((x%y)+y)%y'),
    and: op('&&'),
    or: op('||'),
    eq: op('==='),

    map: 2,
    filter: 2,
    zip: 1,
    initial: 1,
    find: 2,
    findIndex: 2,
    zipObject: 2,
    pluck: 2,

    push: w2('y.concat([x])'),
    attr: w2('y[x]'),
    zero: w1('!!x'),
    not: w1('!x'),

    curry: curry,

    wrap: curry(function(attr, value) {
      var obj = {};
      obj[attr] = value;
      return obj;
    }),

    _: function(method) {
      method = _[method];

      if (typeof method === 'function') {
        if (method.length === 2) {
          return ku.compose(ku.flip, ku.curry)(method);
        } else {
          return method;
        }
      }
    },

    flip: curry(function(f, x, y) {
      return f(y, x);
    }),

    compose: curry(function(f, g, x) {
      return f(g(x));
    }),

    method: function(attr) {
      var args = Array.prototype.slice(arguments, 1);

      return function(obj) {
        return obj[attr] && obj[attr].apply(null, args)
      };
    }
  };

  for (var method in ku) {
    if (ku[method] === 1) {
      ku[method] = w1('_.' + method + '(x)');
    } else if(ku[method] === 2) {
      ku[method] = w2('_.' + method + '(y,x)');
    }
  }

  return ku;
});
