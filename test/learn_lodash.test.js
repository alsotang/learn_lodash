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
});