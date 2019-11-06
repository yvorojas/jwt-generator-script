const consts = require('./consts');

const getParams = require('./getParams');
const generateFolders = require('./generateFolders');
const generateCerts = require('./generateCerts');
const generateTokens = require('./generateTokens');

const params = getParams();
if (!params['use-old-certs']) {
  generateFolders(consts.CERTS_FOLDER_ROUTE);
  generateCerts();
}
generateFolders(consts.TOKENS_FOLDER_ROUTE);
generateTokens(params.tokens, params['application-name'], params.environment);
