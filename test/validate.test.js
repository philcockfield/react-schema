import React from "react";
import { expect } from "chai";
import PropTypes from "../src";


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
