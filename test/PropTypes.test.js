import { expect } from 'chai';
import { format } from '../src/PropTypeFormatter';
import PropTypes from '../src/PropTypes';

describe('React PropTypes', () => {
  it('exposes all React prop-types', () => {
    Object.keys(PropTypes).forEach((key) => {
      expect(PropTypes[key]).to.be.an.instanceof(Function);
    });
  });

  describe('PropTypes.oneOf', () => {
    it('stores enum values on return object', () => {
      const result = PropTypes.oneOf(['one', 'two']);
      expect(result.$meta.args).to.eql(['one', 'two']);
    });

    it('stores enum values on the corresponding `isRequired` object', () => {
      const result = PropTypes.oneOf(['one', 'two']);
      expect(result.isRequired.$meta.args).to.eql(['one', 'two']);
    });
  });


  describe('PropTypes.oneOfType', () => {
    it('stores type values on return object', () => {
      const result = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
      expect(result.$meta.args).to.eql([PropTypes.string, PropTypes.number]);
    });

    it('stores type values on the corresponding `isRequired` object', () => {
      const result = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
      expect(result.isRequired.$meta.args).to.eql([PropTypes.string, PropTypes.number]);
    });
  });

  describe('PropTypes.shape', () => {
    it('stores the shape on the return object', () => {
      const result = PropTypes.shape({ isEnabled: PropTypes.bool });
      expect(result.$meta.args).to.eql({ isEnabled: PropTypes.bool });
    });

    it('stores the shape on the corresponding `isRequired` object', () => {
      const result = PropTypes.shape({ isEnabled: PropTypes.bool });
      expect(result.isRequired.$meta.args).to.eql({ isEnabled: PropTypes.bool });
    });
  });
});
