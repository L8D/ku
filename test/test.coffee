should = require 'should'
ku = require '../ku'

describe 'ku', ->
  describe 'curry', ->
    it 'should return a carrier when called with no arguments', ->
      f = (x) -> x
      ku.curry(f)()
        .should.be.type 'function'

    it 'should apply function when given full arguments', ->
      f = ku.curry (x, y, z) -> x + y + z
      f(1, 2, 3).should.be.exactly 6

    it.skip 'should spill arguments if a function is returned', ->
      obj = foo: 'bar'
      f1 = (func, object) -> func.bind object
      f2 = (obj) -> obj.foo

      ku.curry(f1)(f2, obj, obj).should.be.exactly 'bar'

    it 'should partially apply function when not given full arguments', ->
      f = ku.curry (x, y, z) -> x + y + z
      f2 = f 1, 2
      f2(3).should.be.exactly 6

    it 'should not perform arity detection when given a second argument', ->
      f = ku.curry ((x, y, z) -> x + y), 2
      f(1, 2).should.be.exactly 3
      f(1)(2).should.be.exactly 3

  describe 'operator', ->
    describe 'add', ->
      it 'should add two numbers', ->
        ku.add(-20, 10).should.be.exactly -10

      it 'should add two strings in reverse order of arguments', ->
        ku.add(' bar', 'foo').should.be.exactly 'foo bar'

    describe 'sub', -> it 'should subtract two numbers', ->
      ku.sub(1, 3).should.be.exactly 2

    describe 'mul', -> it 'should multiply two numbers', ->
      ku.mul(5, 6).should.be.exactly 30

    describe 'div', -> it 'should divide two numbers', ->
      ku.div(2, 6).should.be.exactly 3

    describe 'mod', -> it 'should perform modulo operation on two numbers', ->
      ku.mod(57, 40).should.be.exactly 17

    describe 'cmod', -> it 'should perform correct modulo operation', ->
      ku.cmod(-63, 40).should.be.exactly 17

    describe 'and', -> it 'should perform logical AND comparison', ->
      ku.and(true, true).should.be.true
      ku.and(true, false).should.be.false
      ku.and(false, true).should.be.false
      ku.and(false, false).should.be.false
      ku.and(1, 2).should.be.exactly 1
      ku.and(1, 0).should.be.exactly 0

    describe 'or', -> it 'should perform logical OR comparison', ->
      ku.or(true, false).should.be.true
      ku.or(false, true).should.be.true
      ku.or(false, false).should.be.false
      ku.or(1, 2).should.be.exactly 2
      ku.or(1, 0).should.be.exactly 1

    describe 'eq', -> it 'should strictly compare two objects', ->
      ku.eq({}, {}).should.be.false
      ku.eq(1, 1).should.be.true
      ku.eq(null, undefined).should.be.false

    describe 'max', ->
      it 'should find the maximum value in an array', ->
        ku.max([4, 3, 5, 1, 6, 2]).should.be.exactly 6

      it 'should return -Infinity when supplied an empty array', ->
        ku.max().should.be.exactly -Infinity

    describe 'min', ->
      it 'should find the minimum value in an array', ->
        ku.min([4, 3, 5, 1, 6, 2]).should.be.exactly 1

      it 'should return Infinity when supplied an empty array', ->
        ku.min().should.be.exactly Infinity
