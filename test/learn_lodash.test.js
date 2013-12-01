var should = require('should');
var _ = require('../');

describe("test/learn_lodash.test.js", function () {
  it('should be true', function () {
    true.should.be.true;
  });

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
});