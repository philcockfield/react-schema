import { expect } from 'chai';
import ReactSchema from '../src';
import PropTypes from '../src/PropTypes';

describe('PropTypeValidator', () => {
  it('is valid', () => {
    const propTypes = {
      myBool: PropTypes.bool,
      myString: PropTypes.string,
      myNumber: PropTypes.number,
    };
    const result = ReactSchema.validate(propTypes, { myBool: true, myString: 'Foo', myNumber: 123 });
    expect(result.isValid).to.equal(true);
  });

  it('is not valid (passes optional component name)', () => {
    const result = ReactSchema.validate({ isEnabled: PropTypes.bool }, { isEnabled: 123 }, 'MyComponent');
    expect(result.isValid).to.equal(false);
    expect(result.errors.isEnabled.message).to.contain('MyComponent');
  });

  it('validates a single propType', () => {
    expect(ReactSchema.validate(PropTypes.bool, true).isValid).to.equal(true);
    expect(ReactSchema.validate(PropTypes.bool, 123).isValid).to.equal(false);
  });
});
