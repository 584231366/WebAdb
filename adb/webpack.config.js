const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'library',
    path: path.resolve(__dirname, '../test'),
    filename: 'adb.js',
  },
};