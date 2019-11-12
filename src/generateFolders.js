const fs = require('fs');

module.exports = folderRoute => {
  const existsFolder = fs.existsSync(folderRoute);
  if (existsFolder) {
    fs.readdirSync(folderRoute).forEach(file => {
      fs.unlinkSync(`${folderRoute}/${file}`);
    });
  } else {
    fs.mkdirSync(folderRoute);
  }
};
