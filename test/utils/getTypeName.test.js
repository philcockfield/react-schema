import subject from "../../src/utils/getTypeName";
import { expect } from "chai";
import React from "react";
import PropTypes from "../../src/PropTypes";

describe("utils::getTypeName", () => {
  context('given a nilly', function() {
    it('returns undefined', function() {
      expect(subject()).to.equal(undefined);
    });
  });

  context('given an introspectable checker', function() {
    it('returns its pre-defined type', function() {
      expect(subject({ $meta: { type: 'foo' } })).to.equal('foo');
    });
  });

  describe('pre-defined types in PropTypes or React.PropTypes', function() {
    context('given React.PropTypes.string', function() {
      it('returns "string"', function() {
        expect(subject(React.PropTypes.string)).to.equal('string');
      });
    });

    context('given React.PropTypes.string.isRequired', function() {
      it('returns "string"', function() {
        expect(subject(React.PropTypes.string.isRequired)).to.equal('string');
      });
    });

    context('given PropTypes.string', function() {
      it('returns "string"', function() {
        expect(subject(PropTypes.string)).to.equal('string');
      });
    });

    context('given PropTypes.string.isRequired', function() {
      it('returns "string"', function() {
        expect(subject(PropTypes.string.isRequired)).to.equal('string');
      });
    });
  });
});