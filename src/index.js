import R from "ramda";
import PropTypes from "./PropTypes";
import validator from "./validator";


export default {
  PropTypes,

  /**
   * Performs validation on the a set of properties.
   * @param propTypes:      An object containing the property-type definiitons
   *                        or a single PropType.
   * @param props:          An object of properties to validate
   *                        or a single value of a single <propTypes> definiiton was passed.
   * @param componentName:  Optional. The name of the component being validated.
   *                        Used in error message.
   * @return {object} validation results.
   */
  validate(propTypes, props, componentName) {
    if (R.is(Function, propTypes)) {
      propTypes = { value: propTypes };
      props = { value: props };
    }
    return validator(propTypes).validate(props, componentName);
  }
};
