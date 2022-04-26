const fs = require('fs');
const Graph = require('digraphe');
const { getPbImports } = require('./parseProto');
const { getBaseFileName } = require('./utils');

const createProtoGraph = (protoFiles) => {
  const graph = new Graph();
  for (let filePath of protoFiles) {
    const proto = fs.readFileSync(filePath, 'utf8');
    const protoImports = getPbImports(proto);
    const mainFile = getBaseFileName(filePath, true);
    graph.addNode(mainFile);
    protoImports.forEach((item) => {
      graph.addEdge(mainFile, getBaseFileName(item, true));
    });
  }
  return graph;
};

module.exports = {
  createProtoGraph
};
