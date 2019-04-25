const consts = require('./consts');
const fs = require('fs');

if (fs.existsSync(consts.TOKEN_ROUTE)){
    fs.unlinkSync(consts.TOKEN_ROUTE);
}

const existsCertFolder = fs.existsSync(consts.CERTS_FOLDER_ROUTE);
if (existsCertFolder) {
    fs.readdirSync(consts.CERTS_FOLDER_ROUTE).forEach(file => {
        fs.unlinkSync(`${consts.CERTS_FOLDER_ROUTE}/${file}`);
    });
} else {
    fs.mkdirSync(consts.CERTS_FOLDER_ROUTE);
}

const shelljs = require('shelljs');

console.log('-----------------------------------------------------------');
console.log('GENERATING CERTS...');
shelljs.exec(consts.SH_ROUTE);
console.log('CERTS GENERATED SUCCESSFULLY!!!');

const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

const privCert = fs.readFileSync(consts.PRIVATE_CERT_ROUTE);

const payload = {
    "environment": "DEVELOPMENT",
    "application_name": "pmc-policy-api",
};

const algorithm =  { 
    algorithm: 'RS256',
    expiresIn: '730d',
}

const token = jsonwebtoken.sign(payload, privCert, algorithm);

console.log('-----------------------------------------------------------');
console.log('SAVE TOKEN FILE...');
fs.writeFileSync(consts.TOKEN_ROUTE, token);
console.log('TOKEN FILE GENERATED SUCCESSFULLY!!');

const pubCert = fs.readFileSync(consts.PUBLIC_CERT_ROUTE);

jsonwebtoken.verify(token, pubCert, (err, decoded) => {
  if (err){
      console.log(err);
  }
  
  console.log('-----------------------------------------------------------');
  console.log('DECODED TOKEN');
  console.log(decoded)
  console.log('PROCESS COMPLETE!!');
  console.log('-----------------------------------------------------------');
});