var Lodash = {
  compact: function (arr) {
    return arr.reduce(function (mem, item) {
      return item && mem.push(item) && mem || mem;
    }, []);
  }
};

module.exports = Lodash;