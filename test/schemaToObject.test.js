import subject from '../src/schemaToObject';
import { arrayOf, shape, string, bool } from '../src/PropTypes';
import { expect } from 'chai';

describe('utils::schemaToObject', function() {
  describe('converting shapes to objects', function() {
    it('works with an empty shape', function() {
      expect(subject(shape({}))).to.deep.equal({});
    });

    it('works with a shape containing some literal properties', function() {
      expect(subject(shape({ name: string }))).to.deep.equal({ name: 'string' });
    });

    it('works with nested shapes', function() {
      const schema = shape({
        id: string,
        user: shape({
          id: string
        })
      });

      expect(subject(schema)).to.deep.equal({
        id: 'string',
        user: {
          id: 'string'
        }
      });
    });
  });

  describe('converting arrayOf to arrays', function() {
    it('works with a literal as an element type', function() {
      expect(subject(arrayOf(string))).to.deep.equal(['string']);
    });

    it('works with a shape as an element type', function() {
      expect(
        subject(arrayOf(shape({ id: string })))
      ).to.deep.equal(
        [{ id: 'string' }]
      );
    });

    it('works with bools', function() {
      expect(
        subject(arrayOf(bool))
      ).to.deep.equal(
        ['bool']
      );
    });
  });

  it('leaves "null" fields untouched', function() {
    expect(subject(shape({ __emberModel__: null }))).to.deep.equal({
      __emberModel__: null
    });
  });
});
