const clone = require("./utils/clone");
const createIntrospectableChecker = require("./utils/createIntrospectableChecker");
const React = require("react");
const PropTypes = clone(React.PropTypes);

/**
 * Common combinations of types.
 */
PropTypes.numberOrString = PropTypes.oneOfType([
  React.PropTypes.number,
  React.PropTypes.string
]);

PropTypes.boolOrString = PropTypes.oneOfType([
  React.PropTypes.bool,
  React.PropTypes.string
]);

[ "shape", "arrayOf", "oneOf", "oneOfType" ].forEach(function(type) {
  PropTypes[type] = createIntrospectableChecker(type, React.PropTypes[type]);
});

// ----------------------------------------------------------------------------
module.exports = PropTypes;

