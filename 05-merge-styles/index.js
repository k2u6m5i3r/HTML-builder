var fs = require('fs');
const path = require('path');

let inFolder = path.join(__dirname, 'styles');

function isCssFile(file) {
  let ans = true;
  if (file.slice(file.lastIndexOf('.') + 1) == 'css') {
    ans = true;
  } else {
    ans = false;
  }
  return ans;
}
fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
  if (err) throw err;
  // console.log("Создание пустого фала!");
});
fs.readdir(inFolder, (err, items) => {
  // console.log(items);
  for (let i = 0; i < items.length; i++) {
    fs.stat(path.join(inFolder, items[i]), (err, stats) => {
      //console.log(stats);
      if (stats.isFile() && isCssFile(path.join(inFolder, items[i]))) {
        fs.readFile(path.join(inFolder, items[i]), 'utf8', (err, data) => {
          if (err) throw err;
          fs.appendFile(
            path.join(__dirname, 'project-dist', 'bundle.css'),
            data,
            (err) => {
              if (err) throw err;
              // console.log('Data has been added!');
            },
          );
        });
      }
    });
  }
});
