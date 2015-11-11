import React from "react";
import { expect } from "chai";
import { format } from "../src/PropTypeFormatter";
import PropTypes from "../src/PropTypes";
import { analyze } from "../src/PropTypeAnalyzer";

describe("PropTypeAnalyzer", () => {
  context('given a non-introspectable type checker', function() {
    it('returns a literal node', function() {
      expect(analyze(React.PropTypes.string)).to.deep.equal({
        type: 'literal',
        value: 'string'
      });
    });
  });

  context('given a null for a checker', function() {
    it('returns a literal node with a null for a value', function() {
      expect(analyze(null)).to.deep.equal({
        type: 'literal',
        value: null
      });
    });
  });

  context('given a REQUIRED non-introspectable type checker', function() {
    it('returns a literal node', function() {
      expect(analyze(React.PropTypes.string.isRequired)).to.deep.equal({
        type: 'literal',
        value: 'string',
        isRequired: true
      });
    });
  });

  describe("PropTypes.shape", () => {
    it('generates the AST', function() {
      const shape = PropTypes.shape({
        name: PropTypes.string
      });

      const ast = analyze(shape);

      expect(ast.type).to.equal('shape');
      expect(ast.isRequired).to.equal(undefined);

      expect(ast.properties.length).to.equal(1);
      expect(ast.properties[0].name).to.equal('name');
      expect(ast.properties[0].type).to.equal('literal');
      expect(ast.properties[0].value).to.equal('string');
    });

    it('works with isRequired', function() {
      const shape = PropTypes.shape({
        name: PropTypes.string
      }).isRequired;

      const ast = analyze(shape);

      expect(ast.type).to.equal('shape');
      expect(ast.isRequired).to.equal(true);
    });

    it('works with nested shapes', function() {
      const shape = PropTypes.shape({
        links: PropTypes.shape({
          next: PropTypes.string
        })
      });

      const ast = analyze(shape);

      expect(ast.properties.length).to.equal(1);
      expect(ast.properties[0].name).to.equal('links');
      expect(ast.properties[0].type).to.equal('shape');
      expect(ast.properties[0].properties.length).to.equal(1);
      expect(ast.properties[0].properties[0].name).to.equal('next');
      expect(ast.properties[0].properties[0].type).to.equal('literal');
      expect(ast.properties[0].properties[0].value).to.equal('string');
    });
  });

  describe("PropTypes.arrayOf", function() {
    it('generates the AST', function() {
      const propType = PropTypes.arrayOf(PropTypes.string);
      const ast = analyze(propType);

      expect(ast.type).to.equal('arrayOf');

      expect(ast.element).to.be.truthy;
      expect(ast.element.type).to.equal('literal');
      expect(ast.element.value).to.equal('string');
    });
  });

  describe("PropTypes.oneOfType", function() {
    it('generates an AST', function() {
      const propType = PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]);
      const ast = analyze(propType);

      expect(ast.type).to.equal('oneOfType');

      expect(ast.types).to.be.truthy;
      expect(ast.types.length).to.equal(2);

      expect(ast.types[0].type).to.equal('literal');
      expect(ast.types[0].value).to.equal('string');

      expect(ast.types[1].type).to.equal('literal');
      expect(ast.types[1].value).to.equal('number');
    });
  });
});
