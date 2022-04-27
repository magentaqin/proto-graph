const path = require('path');

const getBaseFileName = (filePath, withExt = false) => {
  if (withExt) return path.parse(filePath).base;
  return path.parse(filePath).name;
};

const jsonReplacer = (key, value) => {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries())
    };
  } else {
    return value;
  }
};

module.exports = {
  getBaseFileName,
  jsonReplacer
};
