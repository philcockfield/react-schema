const clone = require('./utils/clone');
const createIntrospectableChecker = require('./utils/createIntrospectableChecker');
const ReactPropTypes = require('./ReactPropTypes');
const PropTypes = clone(ReactPropTypes);

/**
 * Common combinations of types.
 */
PropTypes.numberOrString = PropTypes.oneOfType([
  ReactPropTypes.number,
  ReactPropTypes.string,
]);

PropTypes.boolOrString = PropTypes.oneOfType([
  ReactPropTypes.bool,
  ReactPropTypes.string,
]);

['shape', 'arrayOf', 'oneOf', 'oneOfType'].forEach(type => {
  PropTypes[type] = createIntrospectableChecker(type, ReactPropTypes[type]);
});

// ----------------------------------------------------------------------------
module.exports = PropTypes;
