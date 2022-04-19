const protoParser = require('proto-parser');
const { fileErrors } = require('./errorCodes');

function getPbImports(content) {
  try {
    return protoParser.parse(content).imports || [];
  } catch (error) {
    return { code: fileErrors.PARSE_PB_ERROR, error };
  }
}

module.exports = {
  getPbImports
};
