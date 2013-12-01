var deepEqual = require('./eql');

var Lodash = {
  // Arrays
  compact: function (arr) {
    return arr.reduce(function (mem, item) {
      return item && mem.push(item) && mem || mem;
    }, []);
  },
  // function ([array]) {}
  difference: function () {
    var self = this;
    var args = [].slice.call(arguments);
    return args.reduce(function (arr1, arr2) {
      return self._difference(arr1, arr2);
    });
  },
  _difference: function (arr1, arr2) {
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
          if (!(deepEqual(callback[k], obj[k]) || Array.isArray(obj[k]) && self.contains(obj[k], callback[k]))) {
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
            if (!(deepEqual(callback[k], obj[k]) || Array.isArray(obj[k]) && self.contains(obj[k], callback[k]))) {
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
  flatten: function (arr, isShallow, callback, thisArg) {
    var self = this;
    isShallow = isShallow === undefined ? Infinity : isShallow;
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (Array.isArray(item) && isShallow) {
        result = result.concat(self.flatten(item, isShallow - 1));
      } else {
        result.push(item);
      }
    }
    return result;
  },

  indexOf: function (arr, value, fromIndex) {
    fromIndex = fromIndex || 0;
    return arr.slice(fromIndex).indexOf(value) + fromIndex;
  },

  initial: function (arr, callback, thisArg) {
    var result = [];
    if (typeof callback === 'function') {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (!callback(item)) {
          result.push(item);
        } else {
          break;
        }
      }
    } else if (typeof callback === 'number' || typeof callback === 'undefined') {
      callback = callback || arr.length;
      result = arr.slice(0, callback - 1);
    }
    return result;
  },

  // function ([array]) {}
  intersection: function () {
    args = [].slice.call(arguments);
    var valueCount = {};
    var argsCount = args.length;
    var result = [];
    args.forEach(function (arr) {
      arr.forEach(function (value) {
        valueCount[value] = (valueCount[value] || 0) + 1;
      });
    });
    for (var k in valueCount) {
      var value = valueCount[k];
      if (value === argsCount) {
        result.push(k);
      }
    }
    return result;
  },

  last: function (arr, callback, thisArg) {
    var self = this;
    var result;
    arr.reverse();
    result = self.first.apply(self, arguments);
    Array.isArray(result) && result.reverse();
    return result;
  },

  lastIndexOf: function () {
    var arr = arguments[0].reverse();
    return arr.length - this.indexOf.apply(this, arguments) - 1;
  },

  pull: function () {
    var self = this;
    var args = [].slice.call(arguments);
    var arr = args[0];
    return self.difference(arr, args.slice(1));
  },

  // function ([start=0], end, [step=1]) {}
  range: function () {
    var negativeFlag = false;
    var args = [].slice.call(arguments);
    var start, end, step;
    if (args.length === 1) {
      start = 0;
      end = args[0];
      step = 1;
    } else if (args.length >= 2) {
      start = args[0];
      end = args[1];
      step = args[2] !== undefined ?  args[2] : 1;
      if (start > end) {
        var _tmp = start;
        start = end + 1;
        end = _tmp + 1;
        step = -step;
        negativeFlag = true;
      }
    }
    var result = [];
    for (var i = start; i < end; i += step) {
      result.push(i);
    }
    negativeFlag && result.reverse();
    return result;
  },

  remove: function (arr, callback) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (callback(item)) {
        result = result.concat(arr.splice(i, 1));
        i--;
      }
    }
    return result;
  },

  rest: function () {
    var self = this;
    arguments[0].reverse();
    return self.initial.apply(self, arguments).reverse();
  },

  sortedIndex: function (arr, value) {
    var index = arr.length;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > value) {
        index = i;
        break;
      }
    }
    return index;
  },

  // function ([array]) {}
  union: function () {
    var self = this;
    var args = [].slice.call(arguments);
    return self.uniq(args.reduce(function (arr1, arr2) {
      return arr1.concat(arr2);
    }));
  },

  uniq: function (arr, isSorted, callback) {
    typeof isSorted !== 'boolean' && (callback = isSorted);
    if (callback) {
      if (typeof callback === 'string') {
        var prop = callback;
        callback = function (item) {
          return item[prop];
        };
      }
    } else {
      callback = function (item) {return item;};
    }
    return arr.reduce(function (mem, item) {
      return mem.map(function (_item) {return callback(_item);}).indexOf(callback(item)) === -1 && mem.push(item) && mem || mem;
    }, []);
  },

  // function (arr, values...) {}
  without: function () {
    var args = [].slice.call(arguments);
    var arr = args[0];
    var values = args.slice(1);
    var result = []; // shallow copy of arr
    arr.forEach(function (item) {
      if (values.indexOf(item) === -1) {
        result.push(item);
      }
    });
    return result;
  },

  // function ([array]) {}
  xor: function () {
    var self = this;
    var args = [].slice.call(arguments);
    return args.reduce(self._xor.bind(self));
  },

  _xor: function (arr1, arr2) {
    var self = this;
    return self.union( // 操，我根本不懂什么是 xor，妈的网上抄来的转换法
      (self.difference(arr1, arr2)),
      (self.difference(arr2, arr1))
      );
  },

  // function ([array]) {}
  zip: function () {
    var args = [].slice.call(arguments);
    var result = [];
    // var l = args[0].length;
    var l = Math.min.apply(Math, args.map(function (arr) {return arr.length;}));
    for (var i = 0; i < l; i++) {
      result.push(args.map(function (arr) {
        return arr[i];
      }));
    }
    return result;
  },

  zipObject: function (keys, values) {
    var l = Math.min.apply(Math, [keys, values].map(function (arr) {return arr.length;}));
    var result = {};
    for (var i = 0; i < l; i++) {
      result[keys[i]] = values[i];
    }
    return result;
  },

  // Collections

  // function (collection, [index]) {}
  at: function () {
    var self = this;
    var args = self.toArray(arguments);

    var indexes;
    var collection = args[0];
    if (args.length === 2) {
      indexes = args[1];
    }
    else if (args.length >= 3) {
      indexes = args.slice(1);
    }
    return indexes.map(function (idx) {
      return collection[idx];
    });
  },

  contains: function (collection, target, fromIndex) {
    fromIndex = fromIndex || 0;
    var bool;
    if (Array.isArray(collection)) {
      var targets = Array.isArray(target) && target || [target];
      var arr = collection.slice(fromIndex);
      bool = true;
      for (var i = 0; i < targets.length; i++) {
        var item = targets[i];
        if (arr.indexOf(item) === -1) {
          bool = false;
          break;
        }
      }
    } else if (typeof collection === 'object') {
      for (var k in collection) {
        var value = collection[k];
        if (deepEqual(value, target)) {
          bool = true;
        }
      }
    } else if (typeof collection === 'string') {
      var str = collection.slice(fromIndex);
      bool = str.indexOf(target) !== -1;
    }
    return bool;
  },
  pluck: function (objArr, prop) {
    return objArr.map(function (obj) {
      return obj[prop];
    });
  },

  toArray: function (collection) {
    return [].slice.call(collection);
  },

  where: function (objArr, props) {
    var self = this;
    var result = [];
    objArr.forEach(function (obj) {
      for (var k in props) {
        if (!(deepEqual(props[k], obj[k]) || Array.isArray(obj[k]) && self.contains(obj[k], props[k]))) {
          return;
        }
      }
      result.push(obj);
    });
    return result;
  },
};

module.exports = Lodash;