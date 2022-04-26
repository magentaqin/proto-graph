const path = require('path');

const getBaseFileName = (filePath, withExt = false) => {
  if (withExt) return path.parse(filePath).base;
  return path.parse(filePath).name;
};

module.exports = {
  getBaseFileName
};
