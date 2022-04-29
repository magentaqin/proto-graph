const path = require('path');
const { walkDir } = require('./walkDir');
const { createProtoGraph } = require('./graph');
const { startServer } = require('./render/server');

// default config
const defaultConfig = {
  baseDir: process.cwd(),
  directory: '' // proto files directory you want to read from
};

class ProtoGraph {
  constructor(config) {
    if (!config.directory) {
      // TODO
      return;
    }
    this.config = Object.assign({}, defaultConfig, config);
    const { baseDir, directory } = this.config;
    const collectedProtos = walkDir(path.resolve(baseDir, directory), '.proto');
    this.graph = createProtoGraph(collectedProtos);
  }

  /**
   * Return the proto dependency graph as an object.
   * @api public
   * @return {Object}
   */
  graph() {
    return this.graph;
  }

  /**
   * Start server and render proto graphs. Allow users to edit graphs.
   * @api public
   */
  render() {
    startServer(this.graph);
  }
}

const protoGraph = new ProtoGraph({
  directory: './test/testProtos'
});

protoGraph.render();

module.exports = ProtoGraph;
