const path = require('path');
const fs = require('fs');

/**
 * DFS. walk the directory using stack instead of recursively calling function.
 * @param {String} dir
 * @param {Array} fileExtensions
 */
const walkDir = (dir, fileExtensions = []) => {
  const stack = [];
  const collectedFiles = [];
  if (!isDirectory(dir)) {
    // TODO
    return [];
  }
  // init stack with the root directory
  stack.push(dir);
  // loop stack
  while (stack.length > 0) {
    const node = stack.pop();
    if (isDirectory(node)) {
      const dirs = fs.readdirSync(node);
      dirs.forEach((item) => {
        stack.push(path.resolve(node, item));
      });
    } else {
      const fileItem = path.resolve(node);
      if (!fileExtensions.length) collectedFiles.push(fileItem);
      // filter files matched
      if (
        fileExtensions.length &&
        fileExtensions.includes(path.extname(node))
      ) {
        collectedFiles.push(fileItem);
      }
    }
  }
  return collectedFiles;
};

const isDirectory = (filePath) => {
  try {
    return fs.lstatSync(filePath).isDirectory();
  } catch (e) {
    console.log('Error', e);
    // TODO
  }
};

module.exports = {
  walkDir
};
