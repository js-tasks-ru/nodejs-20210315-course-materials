const {resolve} = require('path');
const pug = require('pug');

module.exports = {
  welcome: pug.compileFile(resolve(__dirname, 'welcome.pug'), {})
};

