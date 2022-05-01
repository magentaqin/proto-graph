const protoParser = require('proto-parser');
const { fileErrors } = require('./errorCodes');

function getPbImports(content) {
  try {
    // only parse imports without validating types
    const parsedResult = protoParser.parse(content, { weakResolve: true });
    if (parsedResult.error) {
      return { code: fileErrors.PARSE_PB_ERROR, error: parsedResult.error };
    }
    if (Array.isArray(parsedResult.imports)) {
      return parsedResult.imports;
    }
    return [];
  } catch (error) {
    throw new Error(
      JSON.stringify({
        code: fileErrors.PARSE_PB_ERROR,
        error
      })
    );
  }
}

module.exports = {
  getPbImports
};
