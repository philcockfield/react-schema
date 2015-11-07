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
myObject.shape; // Equals: { isEnabled: PropTypes.bool }


const myEnum = PropTypes.oneOf(['one', 'two']);
myEnum.oneOf // Equals: ['one', 'two']

```


#### toString
Property definitions created from the module wrapper provides expressive details about each type when converted to a string.


```js
import { PropTypes } from "react-schema";

const myEnum = PropTypes.oneOf(['one', 'two']);
myEnum.toString(); // returns: "oneOf(one, two)"
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
