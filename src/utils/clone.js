module.exports = function clone(source) {
  return Object.keys(source).reduce(function(cloned, key) {
    cloned[key] = source[key];
    return cloned;
  }, {});
};
