/* eslint no-useless-escape:0  */

import getTypeName from './utils/getTypeName';
const formatters = {};


export const defineFormatter = (typeName, formatter) => (formatters[typeName] = formatter);

export const format = (checker) => {
  const typeName = getTypeName(checker);
  const formatter = formatters[typeName];

  if (formatter && checker && checker.$meta) {
    return formatter(checker.$meta.args);
  }

  return typeName;
};


const shapeToObject = (obj) => {
  const result = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (typeof value === 'function') {
      result[key] = `<${ getTypeName(value) || 'unknown' }>`;

    } else if (value && typeof value === 'object') {
      result[key] = shapeToObject(value); // <== RECURSION.
    }
  });
  return result;
};



defineFormatter('shape', shape => {
  let output = shapeToObject(shape);
  output = JSON.stringify(output).replace(/\"/g, '');
  return `shape(${ output })`;
});

defineFormatter('oneOfType', types => {
  const typeNames = types.map(format).join(', ');
  return `oneOfType(${ typeNames })`;
});

defineFormatter('oneOf', enumValues => `oneOf(${ enumValues.join(', ') })`);
