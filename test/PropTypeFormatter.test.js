import { expect } from 'chai';
import { format } from '../src/PropTypeFormatter';
import PropTypes from '../src/PropTypes';

describe('PropTypeFormatter', () => {
  context('given a regular PropTypes.something', function () {
    it('returns the name of the checker', function () {
      expect(format(PropTypes.string)).to.equal('string');
    });
  });

  context('given an unknown type', function () {
    it('returns undefined', function () {
      expect(format(PropTypes.asdfasdfasdf)).to.equal(undefined);
    });
  });

  context('given a PropTypes.oneOf', () => {
    it('works', () => {
      const result = PropTypes.oneOf(['one', 'two']);
      expect(format(result)).to.equal('oneOf(one, two)');
    });
  });

  context('given a PropTypes.oneOfType', () => {
    it('works', () => {
      const result = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
      expect(format(result)).to.equal('oneOfType(string, number)');
    });
  });

  context('given a PropTypes.shape', () => {
    it('works', () => {
      const result = PropTypes.shape({
        isEnabled: PropTypes.bool,
        foo: {
          total: PropTypes.number,
        },
      });

      expect(format(result)).to.equal('shape({isEnabled:<bool>,foo:{total:<number>}})');
    });
  });
});
