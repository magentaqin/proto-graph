const protoParser = require('proto-parser');
const { fileErrors } = require('./errorCodes');

function getPbImports(content) {
  // only parse imports without validating types
  const parsedResult = protoParser.parse(content, { weakResolve: true });
  if (Array.isArray(parsedResult.imports)) {
    return parsedResult.imports;
  }
  if (parsedResult.error) {
    return { code: fileErrors.PARSE_PB_ERROR, error: parsedResult.error };
  }
  throw new Error(
    JSON.stringify({
      code: fileErrors.PARSE_PB_ERROR,
      error: 'Unclear Pb Parse Error'
    })
  );
}

module.exports = {
  getPbImports
};
