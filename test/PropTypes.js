import React from "react";
import { expect } from "chai";
import PropTypes from "../src/PropTypes";



describe("React PropTypes", () => {
  describe("validate", () => {
    it("is valid", () => {
      const propTypes = {
        myBool: React.PropTypes.bool,
        myString: React.PropTypes.string,
        myNumber: React.PropTypes.number
      };
      const result = PropTypes.validate(propTypes, { myBool: true, myString: "Foo", myNumber: 123 });
      expect(result.isValid).to.equal(true);
    });

    it("is not valid (passes optional component name)", () => {
      const result = PropTypes.validate({ isEnabled: React.PropTypes.bool }, { isEnabled:123 }, "MyComponent");
      expect(result.isValid).to.equal(false);
      expect(result.errors.isEnabled.message).to.contain("MyComponent");
    });

    it("validates a single propType", () => {
      expect(PropTypes.validate(React.PropTypes.bool, true).isValid).to.equal(true);
      expect(PropTypes.validate(React.PropTypes.bool, 123).isValid).to.equal(false);
    });
  });


  describe("PropTypes.oneOf", () => {
    it("stores enum values on return object", () => {
      const result = PropTypes.oneOf(['one', 'two']);
      expect(result.oneOf).to.eql(['one', 'two']);
    });

    it("stores enum values on the corresponding `isRequired` object", () => {
      const result = PropTypes.oneOf(['one', 'two']);
      expect(result.isRequired.oneOf).to.eql(['one', 'two']);
    });

    it("converts toString()", () => {
      const result = PropTypes.oneOf(['one', 'two']);
      expect(result.toString()).to.equal("oneOf(one, two)");
    });
  });


  describe("PropTypes.oneOfType", () => {
    it("stores type values on return object", () => {
      const result = PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]);
      expect(result.oneOfType).to.eql([React.PropTypes.string, React.PropTypes.number]);
    });

    it("stores type values on the corresponding `isRequired` object", () => {
      const result = PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]);
      expect(result.isRequired.oneOfType).to.eql([React.PropTypes.string, React.PropTypes.number]);
    });

    it("converts toString()", () => {
      const result = PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]);
      expect(result.toString()).to.equal("oneOfType(string, number)");
    });
  });


  describe("PropTypes.shape", () => {
    it("stores the shape on the return object", () => {
      const result = PropTypes.shape({ isEnabled: PropTypes.bool });
      expect(result.shape).to.eql({ isEnabled: PropTypes.bool });
    });

    it("stores the shape on the corresponding `isRequired` object", () => {
      const result = PropTypes.shape({ isEnabled: PropTypes.bool });
      expect(result.isRequired.shape).to.eql({ isEnabled: PropTypes.bool });
    });

    it("converts toString()", () => {
      const result = PropTypes.shape({
        isEnabled: PropTypes.bool,
        foo: {
          total: React.PropTypes.number,
        }
      });
      expect(result.toString()).to.equal("shape({isEnabled:<bool>,foo:{total:<number>}})");
    });
  });
});
