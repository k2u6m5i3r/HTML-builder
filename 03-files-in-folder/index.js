var fs = require('fs');
const path = require('path');

let inFolder = path.join(__dirname, 'secret-folder');

fs.readdir(inFolder, (err, items) => {
  // console.log(items);
  for (let i = 0; i < items.length; i++) {
    fs.stat(path.join(inFolder, items[i]), (err, stats) => {
      // console.log(stats);
      if (stats.isFile()) {
        console.log(
          `${items[i].slice(0, items[i].lastIndexOf('.'))} - ${items[i].slice(
            items[i].lastIndexOf('.') + 1,
          )} - ${stats.size}`,
        );
      }
    });
  }
});
