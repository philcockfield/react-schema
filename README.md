# react-schema

[![Build Status](https://travis-ci.org/philcockfield/react-schema.svg)](https://travis-ci.org/philcockfield/react-schema)

Use react [PropTypes](https://facebook.github.io/react/docs/reusable-components.html) for generic object validation.

#### Concept

React provides an extraordinarily concise yet powerful way of defining component API's via [PropTypes](https://facebook.github.io/react/docs/reusable-components.html).  This module:

- Makes it easy to re-use that system for generic validation of object structures decoupled from React UI components.
- Provides an introspectable version of the PropTypes.

## Getting Started

    npm install react-schema

#### Validation

Validate an object against an API definition:

```js
import React from "react";
import schema from "react-schema";

// An API schema.
const mySchema = {
  isEnabled: React.PropTypes.bool.isRequired,
  width: PropTypes.numberOrString,
};

const myData = {
  isEnabled: true,
  width: "10px"
};

// Validate an object against the API.
schema.validate(mySchema, myData); // returns: { isValid: true }

```

#### Introspection

You can introspect details about each type:

```js
import { PropTypes } from "react-schema";

const myObject = PropTypes.shape({ isEnabled: PropTypes.bool });
myObject.$meta.type; // Equals: "shape"
myObject.$meta.args; // Equals: { isEnabled: PropTypes.bool }


const myEnum = PropTypes.oneOf(['one', 'two']);
myEnum.$meta.type; // Equals: "oneOf"
myEnum.$meta.args; // Equals: ['one', 'two']
```

#### Defining your own custom PropTypes

If you need the introspection behavior on a custom type, you need to wrap it using `createIntrospectableChecker`:

```js
const { PropTypes } = require('react-schema');
const createIntrospectableChecker = require('react-schema/lib/utils/createIntrospectableChecker');
const MyCustomPropType = function() {
  // ...
};

// First, we create an introspectable instance of it:
const MyIntrospectableCustomPropType = createIntrospectableChecker(MyCustomPropType);

// Now, we register it as a PropType:
PropTypes.MyCustomPropType = MyIntrospectableCustomPropType;
```

Here's how to register an analyzer for a certain propType:

```js
const PropTypeAnalyzer = require('react-schema/lib/PropTypeAnalyzer');

// @args will be whatever the propType checker was instantiated with
PropTypeAnalyzer.defineAnalyzer('MyCustomPropType', function(args) {
  return {
    type: 'whatever',
    fields: args.map(function(arg) {
      return { type: 'literal', value: arg };
    })
  }
});

// Later on in your consumer code:
const schema = {
  someProp: PropTypes.MyCustomPropType(['foo'])
};

console.log(PropTypeAnalyzer.generateAST(schema));
// => { type: 'whatever', fields: [{ type: 'literal', value: 'foo' }]}
```

And here's how to register a custom formatter:

```js
const PropTypeFormatter = require('react-schema/lib/PropTypeFormatter');

// @args will be whatever the propType checker was instantiated with
PropTypeFormatter.defineFormatter('MyCustomPropType', function(args) {
  return `MyCustomProp: [${args.join(', ')}]`;
});

// Later on in your consumer code:
const schema = PropTypes.MyCustomPropType(['foo']);

console.log(PropTypeFormatter.format(schema));
// => "MyCustomProp: [foo]"
```

#### toString

Property definitions created from the module wrapper provides expressive details about each type when converted to a string.

You can cast a PropType node to a descriptive string (provided it has a formatter defined) using the `PropTypeFormatter`:

```js
import { PropTypes } from "react-schema";
import { format } from "react-schema/lib/PropTypeFormatter";

const myEnum = PropTypes.oneOf(['one', 'two']);
format(myEnum); // => "oneOf(one, two)"
```

## Additional Types

The complement the base PropTypes, the following commonly used definitions are available:

- `PropType.numberOrString`
- `PropType.boolOrString`




## Test
    # Run tests.
    npm test

    # Watch and re-run tests.
    npm run tdd



## Contributors

- [Phil Cockfield](https://github.com/philcockfield)
- [Ahmad Amireh](https://github.com/amireh)


---
### License: MIT
