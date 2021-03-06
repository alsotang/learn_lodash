var should = require('should');
var _ = require('../');

describe("test/learn_lodash.test.js", function () {
  it('should be true', function () {
    true.should.be.true;
  });

  describe('Arrays', function () {
    describe("#compact", function () {
      it('should compact the Array', function () {
        var arr = [1, 2, 3, 4, false, null, 0, "", undefined, NaN, 5, 6];
        _.compact(arr).should.eql([1, 2, 3, 4, 5, 6]);
      });
    });

    describe('#difference', function () {
      it('should be differenced', function () {
        _.difference([1, 2, 3, 4, 5], [5, 2, 10], [1]).should.eql([3, 4]);
      });
    });

    describe('#findIndex', function () {
      it('should find the index', function () {
        var characters = [
          { 'name': 'barney',  'age': 36, 'blocked': false },
          { 'name': 'fred',    'age': 40, 'blocked': true },
          { 'name': 'pebbles', 'age': 1,  'blocked': false }
        ];
        _.findIndex(characters, function(chr) {
          return chr.age < 20;
        }).should.equal(2);
        _.findIndex(characters, { 'age': 36 }).should.equal(0);
        _.findIndex(characters, 'blocked').should.equal(1);
      });
    });

    describe('#findLastIndex', function () {
      it('should find the last index', function () {
        var characters = [
          { 'name': 'barney',  'age': 36, 'blocked': true },
          { 'name': 'fred',    'age': 40, 'blocked': false },
          { 'name': 'pebbles', 'age': 1,  'blocked': true }
        ];
        _.findLastIndex(characters, function(chr) {
          return chr.age > 30;
        }).should.equal(1);
        _.findLastIndex(characters, { 'age': 36 }).should.equal(2);
        _.findLastIndex(characters, 'blocked').should.equal(0);
      });
    });

    it('#first', function () {
      _.first([1, 2, 3])
        .should.equal(1);

      _.first([1, 2, 3], 2)
        .should.eql([1, 2]);

      _.first([1, 2, 3], function(num) {
        return num < 3;
      })
        .should.eql([1, 2]);

      var characters = [
        { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
        { 'name': 'fred',    'blocked': false, 'employer': 'slate' },
        { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
      ];

      _.first(characters, 'blocked')
        .should.eql([{ 'name': 'barney', 'blocked': true, 'employer': 'slate' }]);

      _.pluck(_.first(characters, { 'employer': 'slate' }), 'name')
        .should.eql(['barney', 'fred']);
    });

    it('#flatten', function () {
      _.flatten([1, [2], [3, [[4]]]])
        .should.eql([1, 2, 3, 4]);

      _.flatten([1, [2], [3, [[4]]]], 0)
        .should.eql([1, [2], [3, [[4]]]]);

      _.flatten([1, [2], [3, [[4]]]], 1)
        .should.eql([1, 2, 3, [[4]]]);

      _.flatten([1, [2], [3, [[4]]]], 2)
        .should.eql([1, 2, 3, [4]]);

      _.flatten([1, [2], [3, [[4]]]], true)
        .should.eql([1, 2, 3, [[4]]]);
    });
  });

  it('#indexOf', function () {
    _.indexOf([1, 2, 3, 1, 2, 3], 2)
      .should.equal(1);

    _.indexOf([1, 2, 3, 1, 2, 3], 2, 3)
      .should.equal(4);

    _.indexOf([1, 1, 2, 2, 3, 3], 2, true)
      .should.equal(2);
  });

  it('#initial', function () {
    _.initial([1, 2, 3])
    .should.eql([1, 2]);

    _.initial([1, 2, 3], 2)
    .should.eql([1]);

    _.initial([1, 2, 3], function(num) {
      return num > 1;
    })
    .should.eql([1]);
  });

  it('#intersection', function () {
    _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1])
    .should.eql([1, 2]);
  });

  it('#last', function () {
    _.last([1, 2, 3])
    .should.equal(3);

    _.last([1, 2, 3], 2)
    .should.eql([2, 3]);

    _.last([1, 2, 3], function(num) {
      return num > 1;
    })
    .should.eql([2, 3]);
  });

  it('#lastIndexOf', function () {
    _.lastIndexOf([1, 2, 3, 1, 2, 3], 2)
    .should.equal(4);

    _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3)
    .should.equal(1);
  });

  it('#pull', function () {
    var array = [1, 2, 3, 1, 2, 3];
    _.pull(array, 2, 3)
    .should.eql([1, 1]);
  });

  it('#range', function () {
    _.range(4).should.eql([0, 1, 2, 3]);

    _.range(1, 5).should.eql([1, 2, 3, 4]);

    _.range(0, 20, 5).should.eql([0, 5, 10, 15]);

    _.range(0, -4, -1).should.eql([0, -1, -2, -3]);

    _.range(0).should.eql([]);
  });

  it('#remove', function () {
    var array = [1, 2, 3, 4, 5, 6];
    var evens = _.remove(array, function(num) { return num % 2 === 0; });

    array.should.eql([1, 3, 5]);

    evens.should.eql([2, 4, 6]);
  });

  it('#rest', function () {
    _.rest([1, 2, 3])
    .should.eql([2, 3]);

    _.rest([1, 2, 3], 2).should.eql([3]);

    _.rest([1, 2, 3], function(num) {
      return num < 3;
    }).should.eql([3]);
  });

  it('#sortedIndex', function () {
    _.sortedIndex([20, 30, 50], 40)
    .should.equal(2);
  });

  it('#union', function () {
    _.union([1, 2, 3], [5, 2, 1, 4], [2, 1])
    .should.eql([1, 2, 3, 5, 4]);
  });

  it('#uniq', function () {
    _.uniq([1, 2, 1, 3, 1])
    .should.eql([1, 2, 3]);

    _.uniq([1, 1, 2, 2, 3], true)
    .should.eql([1, 2, 3]);

    _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); })
    .should.eql(['A', 'b', 'C']);

    _.uniq([1, 2.5, 3, 1.5, 2, 3.5], (function(num) { return this.floor(num); }.bind(Math)))
    .should.eql([1, 2.5, 3]);

    // using "_.pluck" callback shorthand
    _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x')
    .should.eql([{ 'x': 1 }, { 'x': 2 }]);
  });

  it('#without', function () {
    _.without([1, 2, 1, 0, 3, 1, 4], 0, 1)
    .should.eql([2, 3, 4]);
  });

  it('#xor', function () {
    _.xor([1, 2, 3], [5, 2, 1, 4])
    .should.eql([3, 5, 4]);

    _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5])
    .should.eql([1, 4, 5]);
  });

  it('#zip', function () {
    _.zip(['fred', 'barney'], [30, 40], [true, false])
    .should.eql([['fred', 30, true], ['barney', 40, false]]);

    _.zip(['fred', 'barney'], [30, 40, 50], [true, false])
    .should.eql([['fred', 30, true], ['barney', 40, false]]);
  });

  it('#zipObject', function () {
    _.zipObject(['fred', 'barney'], [30, 40])
    .should.eql({ 'fred': 30, 'barney': 40 });

    _.zipObject(['fred', 'barney'], [30, 40, 50, 60])
    .should.eql({ 'fred': 30, 'barney': 40 });
  });

  describe('Collections', function () {
    it('#at', function () {
      _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4])
      .should.eql(['a', 'c', 'e']);

    _.at(['fred', 'barney', 'pebbles'], 0, 2)
    .should.eql(['fred', 'pebbles']);
    });


    it('#contains', function () {
      _.contains([1, 2, 3], 1)
        .should.be.true;

      _.contains([1, 2, 3], [1, 2])
        .should.be.true;

      _.contains([1, 2, 3], 1, 2)
        .should.be.false;

      _.contains({ 'name': 'fred', 'age': 40 }, 'fred')
        .should.be.true;

      _.contains('pebbles', 'eb')
        .should.be.true;
    });

    it('#countBy', function () {
      _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); })
      .should.eql({ '4': 1, '6': 2 });

      _.countBy(['one', 'two', 'three'], 'length')
      .should.eql({ '3': 2, '5': 1 });
    });

    it('#every', function () {
      _.every([true, 1, null, 'yes'])
      .should.be.false;

      _.every([1, 2, 3, 4, 5,], function (item) {
        return item > 0;
      })
      .should.be.true;

      _.every([1, 2, 3, 4, 5, -1], function (item) {
        return item > 0;
      })
      .should.be.false;
    });

    it('#filter', function () {
      var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; })
      .should.eql([2, 4, 6]);
    });

    it('#find', function () {
      var characters = [
        { 'name': 'barney',  'age': 36, 'blocked': false },
        { 'name': 'fred',    'age': 40, 'blocked': true },
        { 'name': 'pebbles', 'age': 1,  'blocked': false }
      ];

      _.find(characters, function(chr) {
        return chr.age < 40;
      });
    });

    it('#findLast', function () {
      _.findLast([1, 2, 3, 4], function(num) {
        return num % 2 == 1;
      })
      .should.eql([3, 1]);
    });





    it('#invoke', function () {
      _.invoke([[5, 1, 7], [3, 2, 1]], 'sort')
      .should.eql([[1, 5, 7], [1, 2, 3]]);

      _.invoke([123, 456], String.prototype.split, '')
      .should.eql([['1', '2', '3'], ['4', '5', '6']]);
    });

    it('#pluck', function () {
      var characters = [
        { 'name': 'barney', 'age': 36 },
        { 'name': 'fred',   'age': 40 }
      ];

      _.pluck(characters, 'name')
        .should.eql(['barney', 'fred']);
    });

    it('#toArray', function () {
      (function() {
        return _.toArray(arguments).slice(1);
      })(1, 2, 3, 4)
      .should.eql([2, 3, 4]);
    });

    it('#where', function () {
      var characters = [
        { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },
        { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
      ];

      _.where(characters, { 'age': 36 })
        .should.eql([{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]);

      _.where(characters, { 'pets': ['dino'] })
        .should.eql([{ 'name': 'fred', 'age': 40, 'pets': ['baby puss', 'dino'] }]);
    });
  });

  describe('Functions', function () {
    it('#after', function () {
      var fn = function (name) {
        return 'hello, ' + name;
      };
      fn = _.after(3, fn);
      should(fn('world')).equal(undefined);
      should(fn('world')).equal(undefined);
      should(fn('world')).equal('hello, world');
      should(fn('world')).equal('hello, world');

      var person = {
        sayHi: function (name) {
          return 'Hi! ' + name;
        }
      };
      sayHi = _.after(3, person.sayHi, person);
      should(sayHi('world')).equal(undefined);
      should(sayHi('world')).equal(undefined);
      should(sayHi('world')).equal('Hi! world');
      should(sayHi('world')).equal('Hi! world');
    });

    it('#curry', function () {
      var curried = _.curry(function(a, b, c) {
        return a + b + c;
      });

      curried(1)(2)(3)
      .should.equal(6);

      curried(1, 2)(3)
      .should.equal(6);

      curried(1, 2, 3)
      .should.equal(6);
    });
  });

  describe('Objects', function () {
    it('#invert', function () {
      _.invert({ 'first': 'fred', 'second': 'barney' })
      .should.eql({ 'fred': 'first', 'barney': 'second' });
    });

    it('#mapValues', function () {
      _.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(num) { return num * 3; })
      .should.eql({ 'a': 3, 'b': 6, 'c': 9 });
    });
  });
});