module.exports = function clone(source) {
  return Object.keys(source).reduce((cloned, key) => {
    cloned[key] = source[key];
    return cloned;
  }, {});
};
