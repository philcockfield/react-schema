
/**
 * A helper object for validating a set of PropTypes.
 */
class Validator {
  constructor(propTypes = {}) {
    this.propTypes = propTypes;
  }


  /**
   * Validates the given properties.
   * @param props: An object of properties to validate.
   * @param componentName: Optional. The name of the component being validated.
   *                       Used in error message.
   * @returns results object.
   */
  validate(props = {}, componentName) {
    const result = { isValid: true };
    Object.keys(this.propTypes).forEach(key => {
          let validator = this.propTypes[key];
          let error = validator(props, key, componentName);
          if (error !== null) {
            result.isValid = false;
            result.errors = result.errors || {}
            result.errors[key] = error;
          }
        });
    return result;
  }
}


export default (propType) => { return new Validator(propType) };
