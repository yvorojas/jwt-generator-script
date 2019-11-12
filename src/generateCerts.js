const shelljs = require('shelljs');
const consts = require('./consts');

module.exports = () => {
  console.log('-----------------------------------------------------------');
  console.log('GENERATING CERTS...');
  shelljs.exec(consts.SH_ROUTE);
  console.log('CERTS GENERATED SUCCESSFULLY!!!');
};
