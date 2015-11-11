const PropTypes = require("../PropTypes");
const React = require("react");

/**
 * Attempts to locate (or infer) the PropType name from a checker.
 *
 * @param {Function} checker
 *        This could either be an instance of a chainable type checker (like
 *        oneOf and shape) or a primitive type checker (string or number).
 *
 * @return {String}
 */
module.exports = function getTypeName(checker) {
  // think they can fool us??
  if (!checker) {
    return undefined;
  }
  // an introspectable checker?
  else if (checker.$meta) {
    return checker.$meta.type;
  }

  let typeName;

  // maybe a primitive checker?
  Object.keys(React.PropTypes).some(function(key) {
    if (
      (React.PropTypes[key] === checker) ||
      (React.PropTypes[key] && React.PropTypes[key].isRequired === checker) ||
      (PropTypes[key] === checker) ||
      (PropTypes[key] && PropTypes[key].isRequired === checker)
    ) {
      typeName = key;
      return true;
    }
  });

  return typeName;
};
