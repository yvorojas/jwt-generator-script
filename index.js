// Const definition
const SH_ROUTE = './generate_certs.sh';
const CERTS_FOLDER_ROUTE = './certs';
const PRIVATE_CERT_ROUTE = './certs/private_cert.pem';
const PUBLIC_CERT_ROUTE = './certs/public_cert.pub';
const TOKEN_ROUTE = 'token'; 
const RSA_FILE_ROUTE = './certs/private_cert.pem.pub';

// File control dependency
const fs = require('fs');

// Delete previous generated token
if (fs.existsSync(TOKEN_ROUTE)){
    fs.unlinkSync(TOKEN_ROUTE);
}

// Delete previous certs files
const existsCertFolder = fs.existsSync(CERTS_FOLDER_ROUTE);
if (existsCertFolder) {
    fs.readdirSync(CERTS_FOLDER_ROUTE).forEach(file => {
        fs.unlinkSync(`${CERTS_FOLDER_ROUTE}/${file}`);
    });
} else {
    fs.mkdirSync(CERTS_FOLDER_ROUTE);
}

// Dependency to execute shell script to create priv and pub cert 
const shelljs = require('shelljs');

/**
 * Using this link to get sh to create priv and pub certs.
 * https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9
 * NOTE: in default, no add passphrase, hit enter twice.
 */

// Execute sh
console.log('-----------------------------------------------------------');
console.log('GENERATING CERTS...');
shelljs.exec(SH_ROUTE, {silent:true});
console.log('CERTS GENERATED SUCCESSFULLY!!!');

fs.unlinkSync(RSA_FILE_ROUTE);

// JWT dependencies
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

//route for private cert
const privCert = fs.readFileSync(PRIVATE_CERT_ROUTE); 

//function to generate a jwt based on privCert with RS256 Algorithm and a duraction of 2 years, with a assigned payload
var token = jsonwebtoken.sign(
    { 
        type: 'API_KEY',
        application_name: 'API_COTIZACION',
        environment: 'DEVELOPMENT',
    }, privCert, 
    { 
        algorithm: 'RS256',
        expiresIn: '730d',
    });

//save token in file
console.log('-----------------------------------------------------------');
console.log('SAVE TOKEN FILE...');
fs.writeFileSync(TOKEN_ROUTE, token);
console.log('TOKEN FILE GENERATED SUCCESSFULLY!!');

//route for private cert
var pubCert = fs.readFileSync(PUBLIC_CERT_ROUTE);  // route for public cert

//Verify private token with pubCert, and obtain the decoded token
jsonwebtoken.verify(token, pubCert, function(err, decoded) {
  //If error, show error in console
  if (err){
      console.log(err);
  }
  //show decode token in console
  console.log('-----------------------------------------------------------');
  console.log('DECODED TOKEN');
  console.log(decoded)
  console.log('PROCESS COMPLETE!!');
  console.log('-----------------------------------------------------------');
});