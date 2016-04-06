const { analyze } = require("./PropTypeAnalyzer");

// Gives us a primitive form of a schema node that we can use with
// Object.whitelist and other schema-based utils.
function schemaToObject(node) {
  if (node.type === "shape") {
    return node.properties.reduce(function(hsh, entry) {
      hsh[entry.name] = schemaToObject(entry);

      return hsh;
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

module.exports = function(rootNode) {
  return schemaToObject(analyze(rootNode));
};
