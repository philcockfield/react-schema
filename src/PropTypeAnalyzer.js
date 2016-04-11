import getTypeName from './utils/getTypeName';
import clone from './utils/clone';
const analyzers = {};


export const defineAnalyzer = (type, analyzer) => {
  analyzers[type] = analyzer;
};

export const analyze = (checker) => {
  let nodeInfo;

  if (checker && checker.$meta) {
    const analyzer = analyzers[checker.$meta.type];

    if (analyzer) {
      nodeInfo = clone(analyzer(checker.$meta.args));
    }
  }

  if (!nodeInfo) {
    nodeInfo = { type: 'literal', value: getTypeName(checker) || null };
  }

  // We can infer whether `isRequired` was used by checking if the generated
  // checker still has this property or not.
  if (typeof checker === 'function' && !checker.hasOwnProperty('isRequired')) {
    nodeInfo.isRequired = true;
  }

  return nodeInfo;
};





defineAnalyzer('shape', properties => {
  const nodeInfo = {};
  nodeInfo.type = 'shape';
  nodeInfo.properties = Object.keys(properties).map(key => {
    const childAST = clone(analyze(properties[key]));
    childAST.name = key;
    return childAST;
  });
  return nodeInfo;
});


defineAnalyzer('arrayOf', element => {
  const nodeInfo = {};
  nodeInfo.type = 'arrayOf';
  nodeInfo.element = analyze(element);
  return nodeInfo;
});


defineAnalyzer('oneOfType', types => {
  const nodeInfo = {};
  nodeInfo.type = 'oneOfType';
  nodeInfo.types = types.map(analyze);
  return nodeInfo;
});
