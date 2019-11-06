const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken');
const consts = require('./consts');

module.exports = (count = 1, application_name = 'my_app', environment = 'TEST') => {
  const privCert = fs.readFileSync(consts.PRIVATE_CERT_ROUTE);
  const pubCert = fs.readFileSync(consts.PUBLIC_CERT_ROUTE);

  const payload = {
    environment,
    application_name,
  };

  const algorithm = {
    algorithm: consts.ALGORITHM,
    expiresIn: consts.EXPIRES_IN,
  };

  console.log('-----------------------------------------------------------');
  console.log('SAVE TOKEN(S) FILE...');
  for (let i = 0; i < count; i += 1) {
    const token = jsonwebtoken.sign(payload, privCert, algorithm);
    fs.writeFileSync(`${consts.TOKEN_ROUTE}_${i + 1}`, token);
    jsonwebtoken.verify(token, pubCert, (err, decoded) => {
      if (err) {
        console.log(err);
      }
      console.log('-----------------------------------------------------------');
      console.log(`DECODED TOKEN ${i + 1}`);
      console.log(decoded);
      console.log('PROCESS COMPLETE!!');
    });
  }
  console.log('-----------------------------------------------------------');
  console.log('TOKEN(S) FILE GENERATED SUCCESSFULLY!!');
};
