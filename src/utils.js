export function is(type, value) {
  if (type === Function) {
    return typeof value === 'function';
  }
  else if (type === Object) {
    return value && typeof value === 'object';
  }
}

export function clone(source) {
  return Object.keys(source).reduce(function(cloned, key) {
    cloned[key] = source[key];
    return cloned;
  }, {});
}

export function contains(value, arr) {
  return arr.indexOf(value) > -1;
}