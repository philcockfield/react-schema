/**
 * Decorates a **CHAINABLE** type checker's output to include the argument it
 * was instantiated with. For example:
 *
 *     shape({ something: string })
 *           ^^^^^^^^^^^^^^^^^^^^^
 *
 *     oneOf([ 'foo', 'bar' ])
 *           ^^^^^^^^^^^^^^^^
 *
 * The decorated checker will contain this information in a $meta property:
 *
 *     {
 *       type: String,
 *       args: Any
 *     }
 *
 * @param {String} type
 * @param {Function} sourceChecker
 */
module.exports = function createIntrospectableChecker(type, sourceChecker) {
  return function applyCheckerAndAddTypeInfo(args) {
    const checker = sourceChecker(args);
    const $meta = { type, args };

    if (!(checker instanceof Function)) {
      throw new Error('You may only decorate chainable, non-primitive type checkers!');
    }

    checker.$meta = $meta;
    checker.isRequired.$meta = $meta;

    return checker;
  };
};
