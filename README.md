# jwt-generator-script

Script for generate JWT Token based on RS256 algorithm (for now...)

This script generate a folder "certs" with public and private certs, and a folder "tokens" with tokens by certs. There are the option to use old certs. This old certs may to be in "certs" folder.

## How to use

### Install dependencies

```
yarn
```

### Execute syntax

```
yarn start --tokens [number] --environment [string] --application-name [string] --use-old-certs 
```

* tokens (alias -t): count of tokens to create. Optional. Default 1.
* environment (alias -e): Optional. Default TEST.
* application-name (alias -a): Optional. Default my_app
* use-old-certs (alias -c): Optional. Default false. -----> THIS OLD CERTS MAY TO BE IN "certs" FOLDER


The option "use-old-certs" NEED TO HAVE public_cert.pub and private_cert.pem in "certs" folder.

```
├─ certs
├─── private_cert.pem
├─── public_cert.pub
```

With alias

```
yarn start -t [number] -e [string] -a [string] -c 
```

### Example

Just with environment and application name, creating certs and 1 token.

```
yarn start --environment STAGING --application-name my-super-app
```
or
```
yarn start -e STAGING -a my-super-app
```

With environment and application name, using old certs and creating 3 tokens.

```
yarn start --tokens 3 --environment STAGING --application-name my-super-app --use-old-certs
```
or
```
yarn start -t 3 -e STAGING -a my-super-app -c
```

