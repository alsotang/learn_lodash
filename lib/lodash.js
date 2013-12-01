var deepEqual = require('./eql');

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



  // Collections
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