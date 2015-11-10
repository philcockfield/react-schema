import React from "react";
import { expect } from "chai";
import { format } from "../src/PropTypeFormatter";
import PropTypes from "../src/PropTypes";

describe("PropTypeFormatter", () => {
  context('given a regular React.PropTypes.something', function() {
    it('returns the name of the checker', function() {
      expect(format(React.PropTypes.string)).to.equal('string');
    });
  });

  context('given an unknown type', function() {
    it('returns undefined', function() {
      expect(format(React.PropTypes.asdfasdfasdf)).to.equal(undefined);
    });
  });

  context("given a PropTypes.oneOf", () => {
    it("works", () => {
      const result = PropTypes.oneOf(['one', 'two']);
      expect(format(result)).to.equal("oneOf(one, two)");
    });
  });

  context("given a PropTypes.oneOfType", () => {
    it("works", () => {
      const result = PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]);
      expect(format(result)).to.equal("oneOfType(string, number)");
    });
  });

  context("given a PropTypes.shape", () => {
    it("works", () => {
      const result = PropTypes.shape({
        isEnabled: PropTypes.bool,
        foo: {
          total: React.PropTypes.number,
        }
      });

      expect(format(result)).to.equal("shape({isEnabled:<bool>,foo:{total:<number>}})");
    });
  });
});
