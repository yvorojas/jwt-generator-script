ssh-keygen -t rsa -b 4096 -f certs/private_cert.pem
# Don't add passphrase
openssl rsa -in certs/private_cert.pem -pubout -outform PEM -out certs/public_cert.pub