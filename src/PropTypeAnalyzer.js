const getTypeName = require("./utils/getTypeName");
const clone = require("./utils/clone");
const analyzers = {};

exports.analyze = analyze;
exports.define = define;

define("shape", function(properties) {
  let nodeInfo = {};

  nodeInfo.type = "shape";
  nodeInfo.properties = Object.keys(properties).map(function(key) {
    const childAST = clone(analyze(properties[key]));

    childAST.name = key;

    return childAST;
  });

  return nodeInfo;
});

define("arrayOf", function(element) {
  let nodeInfo = {};

  nodeInfo.type = "arrayOf";
  nodeInfo.element = analyze(element);

  return nodeInfo;
});

define("oneOfType", function(types) {
  let nodeInfo = {};

  nodeInfo.type = "oneOfType";
  nodeInfo.types = types.map(analyze);

  return nodeInfo;
});

function define(type, analyzer) {
  analyzers[type] = analyzer;
}

function analyze(checker) {
  let nodeInfo;

  if (checker.$meta) {
    const analyzer = analyzers[checker.$meta.type];

    if (analyzer) {
      nodeInfo = clone(analyzer(checker.$meta.args));
    }
  }

  if (!nodeInfo) {
    nodeInfo = { type: "literal", value: getTypeName(checker) };
  }

  // we can infer whether `isRequired` was used by checking if the generated
  // checker still has this property or not
  if (!checker.hasOwnProperty("isRequired")) {
    nodeInfo.isRequired = true;
  }

  return nodeInfo;
}
