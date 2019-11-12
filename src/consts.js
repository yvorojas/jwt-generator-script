const SH_ROUTE = './generate_certs.sh';
const CERTS_FOLDER_ROUTE = './certs';
const PRIVATE_CERT_ROUTE = './certs/private_cert.pem';
const PUBLIC_CERT_ROUTE = './certs/public_cert.pub';
const TOKENS_FOLDER_ROUTE = './tokens';
const TOKEN_ROUTE = './tokens/token';
const RSA_FILE_ROUTE = './certs/private_cert.pem';

const ALGORITHM = 'RS256';
const EXPIRES_IN = '730d';

module.exports = {
  SH_ROUTE,
  CERTS_FOLDER_ROUTE,
  PRIVATE_CERT_ROUTE,
  PUBLIC_CERT_ROUTE,
  TOKENS_FOLDER_ROUTE,
  TOKEN_ROUTE,
  RSA_FILE_ROUTE,
  ALGORITHM,
  EXPIRES_IN,
};
