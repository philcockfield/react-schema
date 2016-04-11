const { analyze } = require("./PropTypeAnalyzer");


/**
 * Provides a primitive form of a schema node to use with
 * [Object.whitelist] and other schema-based utils.
 *
 * @param {Object} node: The PropTypes node to examine.
 * @return {Object}.
 */
const schemaToObject = (node) => {
  if (node.type === "shape") {
    return node.properties.reduce(function(hash, entry) {
      hash[entry.name] = schemaToObject(entry);
      return hash;
    }, {});
  }
  else if (node.type === "arrayOf") {
    return [ schemaToObject(node.element) ];
  }
  else if (node.type === "literal") {
    return node.value !== undefined ? node.value : null;
  }
  else {
    return null;
  }
}





/**
 * Converts the given schema node to a simple object.
 * @param {Object} rootNode: The PropTypes node to examine.
 * @return {Object}.
 */
export default (rootNode) => schemaToObject(analyze(rootNode));
