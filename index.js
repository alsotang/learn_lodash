var Lodash = {
  // Arrays
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
    var index, newCallback;
    if (typeof callback === 'function') {
      newCallback = callback;
    } else if (typeof callback === 'object') {
      newCallback = function (obj) {
        for (var k in callback) {
          if (callback[k] !== obj[k]) {
            return false;
          }
        }
        return true;
      };
    } else if (typeof callback === 'string') {
      newCallback = function (obj) {
        return obj[callback];
      };
    }
    for (var i = 0; i < arr.length; i++) {
      var obj = arr[i];
      if (newCallback(obj)) {
        index = i;
        break;
      }
    }
    return index;
  },
  findLastIndex: function () {
    var self = this;
    arguments = [].slice.call(arguments);
    arguments[0] = arguments[0].slice().reverse();
    return self.findIndex.apply(self, arguments);
  },
  first: function (arr, callback, thisArg) {
    var result, newCallback;
    if (!callback) {
      result = arr[0];
    } else if (typeof callback === 'number') {
      result = arr.slice(0, callback);
    } else {
      if (typeof callback === 'function') {
        newCallback = callback;
      } else if (typeof callback === 'string') {
        var property = callback;
        newCallback = function (obj) {
          return obj[property];
        };
      } else if (typeof callback === 'object') {
        newCallback = function (obj) {
          for (var k in callback) {
            if (callback[k] !== obj[k]) {
              return false;
            }
          }
          return true;
        };
      }
      result = [];
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (!newCallback(item)) {
          break;
        } else {
          result.push(item);
        }
      }
    }
    return result;
  },
  // Collections
  pluck: function (objArr, prop) {
    return objArr.map(function (obj) {
      return obj[prop];
    });
  },
  where: function () {

  },
};

module.exports = Lodash;