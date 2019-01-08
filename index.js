// consts dependency
const consts = require('./consts');

// File control dependency
const fs = require('fs');

// Delete previous generated token
if (fs.existsSync(consts.TOKEN_ROUTE)){
    fs.unlinkSync(consts.TOKEN_ROUTE);
}

// Delete previous certs files
const existsCertFolder = fs.existsSync(consts.CERTS_FOLDER_ROUTE);
if (existsCertFolder) {
    fs.readdirSync(consts.CERTS_FOLDER_ROUTE).forEach(file => {
        fs.unlinkSync(`${consts.CERTS_FOLDER_ROUTE}/${file}`);
    });
} else {
    fs.mkdirSync(consts.CERTS_FOLDER_ROUTE);
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
shelljs.exec(consts.SH_ROUTE);
console.log('CERTS GENERATED SUCCESSFULLY!!!');

// JWT dependencies
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

// Route for private cert
const privCert = fs.readFileSync(consts.PRIVATE_CERT_ROUTE);

// JWT Payload Definition, a simple object
const payload = {
    "environment": "DEVELOPMENT",
    "application_name": "pmc-policy-api",
};

// JWT algorithm object definition.
const algorithm =  { 
    algorithm: 'RS256',
    expiresIn: '730d',
}

// Function to generate a JWT based on privCert with RS256 Algorithm and a duraction of 2 years, with a assigned payload
const token = jsonwebtoken.sign(payload, privCert, algorithm);

// Save JWT token in file
console.log('-----------------------------------------------------------');
console.log('SAVE TOKEN FILE...');
fs.writeFileSync(consts.TOKEN_ROUTE, token);
console.log('TOKEN FILE GENERATED SUCCESSFULLY!!');

// Route for private cert
const pubCert = fs.readFileSync(consts.PUBLIC_CERT_ROUTE);  // route for public cert

// Verify private token with pubCert, and obtain the decoded token
jsonwebtoken.verify(token, pubCert, (err, decoded) => {
// If error, show error in console
  if (err){
      console.log(err);
  }
// Show decode token in console
  console.log('-----------------------------------------------------------');
  console.log('DECODED TOKEN');
  console.log(decoded)
  console.log('PROCESS COMPLETE!!');
  console.log('-----------------------------------------------------------');
});