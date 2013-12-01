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
        _.difference([1, 2, 3, 4, 5], [5, 2, 10]).should.eql([1, 3, 4]);
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
  });

  describe('Collections', function () {
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
    it('#pluck', function () {
      var characters = [
        { 'name': 'barney', 'age': 36 },
        { 'name': 'fred',   'age': 40 }
      ];

      _.pluck(characters, 'name')
        .should.eql(['barney', 'fred']);
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
});