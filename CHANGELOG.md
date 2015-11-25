# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).


## [Unreleased]
#### Added
#### Changed
#### Deprecated
#### Removed
#### Fixed
#### Security


## [1.1.0]
#### Added
- Added introspection support for `arrayOf`
- Added "analyzers" that give us something close to an AST of the
propType nodes (this is opt-in for those who need it just like the
formatters)
- Added more test coverage

#### Changed
- Library can now handle introspecting & formatting of custom
PropTypes

- Simplified the validator code (got rid of the class, a single function
for validating is easier to reason about for users like myself)

#### Removed
- Implicit definition of custom `toString()` was dropped in favor of
explicit formatting; one can now choose to use the formatter directly
if they need to stringify a prop (and implement their own formatters
if we do not support them out of the box)



## [1.0.5] - 2015-11-7
#### Changed
Removed dependency on Ramda.
