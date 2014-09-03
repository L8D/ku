var should = require('should'),
    ku = require('../ku');

describe('ku', function() {
  describe('curry', function() {
    it('should return a carrier when called with no arguments', function() {
      var fn = function(x) { return x; };

      ku.curry(fn)().should.be.type('function');
    });

    it('should apply function when given full arguments', function() {
      var fn = ku.curry(function(x, y, z) { return x + y + z; });

      fn(1, 2, 3).should.equal(6);
    });

    it.skip('should spill arguments if a function is returned', function() {
      var obj = {foo: 'bar'},

          f1 = function(func, object) { return func.bind(object); },

          f2 = function(obj) { return obj.foo; };

      ku.curry(f1)(f2, obj, obj).should.equal('bar');
    });

    it('should perform partial application', function() {
      var fn = ku.curry(function(x, y, z) { return x + y + z; });

      fn(1, 2)(3).should.equal(6);
    });

    it('should not perform arity detection when given parameter', function() {
      var f = ku.curry((function(x, y, z) { return x + y; }), 2);

      f(1, 2).should.equal(3);
      f(1)(2).should.equal(3);
    });
  });

  describe('operator', function() {
    describe('add', function() {
      it('should add two numbers', function() {
        ku.add(-20, 10).should.equal(-10);
      });

      it('should add two strings in reverse order of arguments', function() {
        ku.add(' bar', 'foo').should.equal('foo bar');
      });
    });

    describe('sub', function() {
      it('should subtract two numbers', function() {
        ku.sub(1, 3).should.equal(2);
      });
    });

    describe('mul', function() {
      it('should multiply two numbers', function() {
        ku.mul(5, 6).should.equal(30);
      });
    });

    describe('div', function() {
      it('should divide two numbers', function() {
        ku.div(2, 6).should.equal(3);
      });
    });

    describe('mod', function() {
      it('should perform modulo operation on two numbers', function() {
        ku.mod(57, 40).should.equal(17);
      });
    });

    describe('cmod', function() {
      it('should perform correct modulo operation', function() {
        ku.cmod(-63, 40).should.equal(17);
      });
    });

    describe('and', function() {
      it('should perform logical AND comparison', function() {
        ku.and(true, true).should.be.true;
        ku.and(true, false).should.be.false;
        ku.and(false, true).should.be.false;
        ku.and(false, false).should.be.false;
        ku.and(1, 2).should.equal(1);
        return ku.and(1, 0).should.equal(0);
      });
    });

    describe('or', function() {
      it('should perform logical OR comparison', function() {
        ku.or(true, false).should.be.true;
        ku.or(false, true).should.be.true;
        ku.or(false, false).should.be.false;
        ku.or(1, 2).should.equal(2);
        ku.or(1, 0).should.equal(1);
      });
    });

    describe('eq', function() {
      it('should strictly compare two objects', function() {
        ku.eq({}, {}).should.be.false;
        ku.eq(1, 1).should.be.true;
        ku.eq(null, void 0).should.be.false;
      });
    });

    describe('max', function() {
      it('should find the maximum value in an array', function() {
        ku.max([4, 3, 5, 1, 6, 2]).should.equal(6);
      });

      it('should return -Infinity when supplied an empty array', function() {
        ku.max().should.equal(-Infinity);
      });
    });

    describe('min', function() {
      it('should find the minimum value in an array', function() {
        ku.min([4, 3, 5, 1, 6, 2]).should.equal(1);
      });

      it('should return Infinity when supplied an empty array', function() {
        ku.min().should.equal(Infinity);
      });
    });
  });

  describe('push', function() {
    it('should push an element to a copied array', function() {
      var a = [1, 2, 3];

      ku.push(4, a).should.eql([1, 2, 3, 4]);
      a.should.eql([1, 2, 3]);
    });
  });

  describe('attr', function() {
    it('should return given property of given object', function() {
      ku.attr('foo', {foo: 'bar'}).should.equal('bar');
    });
  });

  describe('zero', function() {
    it('should return true when given truthy value', function() {
      ku.zero(42).should.be.true;
      ku.zero([]).should.be.true;
    });

    it('should return false when given falsy value', function() {
      ku.zero(null).should.be.false;
      ku.zero(0).should.be.false;
    });
  });

  describe('not', function() {
    it('should return false when given truthy value', function() {
      ku.not(42).should.be.false;
      ku.not([]).should.be.false;
    });

    it('should return true when given falsy value', function() {
      ku.not(null).should.be.true;
      ku.not(0).should.be.true;
    });
  });

  describe('find', function() {
    it('should find element in an array', function() {
      var objs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(num) {
        return {num: num, x: num * 10};
      });

      ku.find(function(obj) { return obj.num === 5; }, objs)
        .should.have.property('x', 50);
    });
  });

  describe('findI', function() {
    it('should return index of element found in an array', function() {
      ku.findI(ku.eq(4), [1, 2, 3, 4, 5, 6, 7, 8]).should.equal(3);
    });
  });

  describe('take', function() {
    it('should take up to given number of elements in an array', function() {
      ku.take(4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).should.eql([1, 2, 3, 4]);
    });

    it('should return full array when given number is too large', function() {
      ku.take(10, [1, 2, 3]).should.eql([1, 2, 3]);
    });
  });

  describe('drop', function() {
    it('should drop up to given number of elements from end', function() {
      ku.drop(4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .should.eql([5, 6, 7, 8, 9, 10]);
    });

    it('should return empty array when given number is too large', function() {
      ku.drop(10, [1, 2, 3, 4, 5]).should.eql([]);
    });
  });

  describe('head', function() {
    it('should return first element of given array', function() {
      ku.head([1, 2, 3, 4, 5]).should.equal(1);
    });

    it('should return undefined when given array is empty', function() {
      (ku.head([]) === undefined).should.be.true;
    });
  });

  describe('tail', function() {
    it('should drop first element of given array', function() {
      ku.tail([1, 2, 3, 4]).should.eql([2, 3, 4]);
    });

    it('should return empty list when array has 0-1 elements', function() {
      ku.tail([1]).should.eql([]);
      ku.tail([]).should.eql([]);
    });
  });

  describe('init', function() {
    it('should return all but the last element of an array', function() {
      ku.init([1, 2, 3, 4, 5]).should.eql([1, 2, 3, 4]);
    });

    it('should return empty list when array has 0-1 elements', function() {
      ku.init([1]).should.eql([]);
      ku.init([]).should.eql([]);
    });
  });

  describe('zip', function() {
    it('should zip arrays', function() {
      ku.zip([['fred', 'barney'], [30, 40], [true, false]])
        .should.eql([['fred', 30, true], ['barney', 40, false]]);
    });

    it('should unzip arrays', function() {
      ku.zip([['fred', 30, true], ['barney', 40, false]]);
    });

    it('should zip array to undefined when there are extras', function() {
      ku.zip([[], [], [1]]).should.eql([[undefined, undefined, 1]]);
    });
  });

  describe('compo', function() {
    it.skip('should compare two similar objects to true', function() {
      ku.compo({foo: 'bar', baz: 1}, {foo: 'bar', baz: 1}).should.be.true;
    });

    it.skip('should compare two unsimilar objects to false', function() {
      ku.compo({foo: 'bar', baz: 2}, {foo: 'bar', baz: 1}).should.be.false;
    });
  });

  describe('func', function() {
    it('should return given function if it is a function', function() {
      var fn = function() {};
      ku.func(fn).should.equal(fn);
    });

    it('should convert string as pluck notation', function() {
      ku.func('foo')({foo: 'bar'}).should.equal('bar');
    });

    it('should convert number as pluck notation', function() {
      ku.func(2)([1, 2, 3, 4]).should.equal(3);
    });

    it.skip('should convert object to where notation', function() {
      ku.func({foo: 'bar'})({foo: 'bar', bar: 2}).should.be.true;
    });
  });

  describe('map', function() {
    it('should map over an array and return a new one', function() {
      ku.map(function(x) { return Math.pow(x, 2); }, [1, 2, 3, 4])
        .should.eql([1, 4, 9, 16]);
    });
  });

  describe('pluck', function() {
    it('should map over an array to given properties of elements', function() {
      var list = [
        {username: 'L8D'},
        {username: 'D8I'},
        {username: 'tj'}
      ];

      ku.pluck('username')(list).should.eql(['L8D', 'D8I', 'tj']);
    });
  });

  describe('filter', function() {
    it('should filter an array by iterator', function() {
      ku.filter(function(x) { return x % 2 === 0; }, [1, 2, 3, 4, 5, 6, 7, 8])
        .should.eql([2, 4, 6, 8]);
    });
  });

  describe('zipo', function() {
    it('should zip two arrays into an object', function() {
      ku.zipo(['foo', 'bar', 'baz', 'quux'], [1, 2, 3, 4])
        .should.eql({foo: 1, bar: 2, baz: 3, quux: 4});
    });
  });

  describe('wrap', function() {
    it('should take an attribute and value and return an object', function() {
      ku.wrap('foo', 'bar').should.eql({foo: 'bar'});
    });
  });

  describe('flip', function() {
    it('should flip the arguments of a function', function() {
      var fn = function(x, y) { return x - y; };

      ku.flip(fn)(3, 7).should.equal(4);
    });
  });

  describe('compose', function() {
    it('should take two functions and return a composed function', function() {
      var fn = ku.compose(function(x) {
        return x + ' bar';
      }, function(x) {
        return x + 'o';
      });

      fn('fo').should.equal('foo bar');
    });
  });

  describe('method', function() {
    it('should take a method name and return a method-caller', function() {
      ku.method('toString')(42).should.equal('42');
    });

    it('should take a method and additional parameters', function() {
      ku.method('toString', 16)(42).should.equal('2a');
    });
  });
});
