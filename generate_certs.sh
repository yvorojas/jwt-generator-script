openssl genrsa -out certs/private_cert.pem 4096
# Don't add passphrase
openssl rsa -in certs/private_cert.pem -pubout -outform PEM -out certs/public_cert.pub -inform pem