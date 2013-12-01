var Lodash = {
  compact: function (arr) {
    return arr.reduce(function (mem, item) {
      return item && mem.push(item) && mem || mem;
    }, []);
  },
  difference: function (arr1, arr2) {
    var resultArr = [];
    arr1.forEach(function (item) {
      if (arr2.indexOf(item) !== -1) {
        return;
      } else {
        resultArr.push(item);
      }
    });
    return resultArr;
  },
  findIndex: function (arr, callback, thisArg) {
    // to be continue
  }
};

module.exports = Lodash;