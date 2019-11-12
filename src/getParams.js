const commandLineArgs = require('command-line-args');

module.exports = () => {
  const optionDefinitions = [
    { name: 'tokens', alias: 't', type: Number },
    { name: 'use-old-certs', alias: 'c', type: Boolean },
    { name: 'environment', alias: 'e', type: String },
    { name: 'application-name', alias: 'a', type: String },
  ];
  const params = commandLineArgs(optionDefinitions);
  return params;
};
