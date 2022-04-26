const fs = require('fs');
const { getPbImports } = require('./parseProto');
const { getBaseFileName } = require('./utils');

class Graph {
  constructor() {
    this.vertexes = [];
    // use Map instead of array or object to optimize read and write performance
    // key is represented as source vertex
    // value is array, represented as target vertex
    this.edges = new Map();
  }

  addVertex(v) {
    this.vertexes.push(v);
    this.edges.set(v, []);
  }

  addEdge(v1, v2) {
    this.edges.get(v1).push(v2);
  }
}

const createProtoGraph = (protoFiles) => {
  const graph = new Graph();
  for (let filePath of protoFiles) {
    const proto = fs.readFileSync(filePath, 'utf8');
    const protoImports = getPbImports(proto);
    const mainFile = getBaseFileName(filePath, true);
    graph.addVertex(mainFile);
    protoImports.forEach((item) => {
      graph.addEdge(mainFile, getBaseFileName(item, true));
    });
  }
  return graph;
};

module.exports = {
  createProtoGraph
};
