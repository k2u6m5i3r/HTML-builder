var fs = require('fs');
const path = require('path');

const projectFolder = path.join(__dirname, 'project-dist');
const projectAssetsFolder = path.join(__dirname, 'project-dist', 'assets');
const stylesFolder = path.join(__dirname, 'styles');
const assetsFolderCopy = path.join(__dirname, 'assets');

fs.mkdir(projectFolder, { recursive: true }, function (err) {
  if (err) throw err;
});

//создание разметки
const inputFile = fs.createReadStream(
  path.join(__dirname, 'template.html'),
  'utf-8',
);
const outputFile = fs.createWriteStream(path.join(projectFolder, 'index.html'));
let str = '';
inputFile.on('data', (data) => {
  str = data.toString();

  fs.readdir(
    path.join(__dirname, 'components'),
    { withFileTypes: true },
    (err, data) => {
      if (err) throw err;
      const ans = [];
      data.forEach((temp) => {
        ans.push(`{{${temp.name.match(/([\w]*\.)*/)[0].replace('.', '')}}}`);
      });
      fs.readdir(path.join(__dirname, 'components'), (err, result) => {
        result.forEach((components, n) => {
          const readStream = fs.createReadStream(
            path.join(__dirname, 'components', components),
            'utf-8',
          );
          readStream.on('data', (data) => {
            str = str.replace(ans[n], data);

            if (!ans.find((temp) => str.includes(temp))) {
              outputFile.write(str);
            }
          });
        });
      });
    },
  );
});

//создание файла стиля
function isCssFile(file) {
  let ans = true;
  if (file.slice(file.lastIndexOf('.') + 1) == 'css') {
    ans = true;
  } else {
    ans = false;
  }
  return ans;
}

fs.readdir(stylesFolder, (err, items) => {
  // console.log(items);
  for (let i = 0; i < items.length; i++) {
    fs.stat(path.join(stylesFolder, items[i]), (err, stats) => {
      //console.log(stats);
      if (stats.isFile() && isCssFile(path.join(stylesFolder, items[i]))) {
        fs.readFile(path.join(stylesFolder, items[i]), 'utf8', (err, data) => {
          if (err) throw err;
          fs.appendFile(
            path.join(__dirname, 'project-dist', 'style.css'),
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

//копирование папки assets
fs.mkdir(projectAssetsFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

async function dirCopyInAssets(sourse, destin) {
  await fs.promises.readdir(sourse, { withFileTypes: true }).then((files) => {
    files.forEach(async (file) => {
      if (file.isDirectory()) {
        //это папка, запустить рекурсию.
        dirCopyInAssets(
          path.join(sourse, file.name),
          path.join(destin, file.name),
        );
      } else {
        fs.mkdir(destin, { recursive: true }, (err) => {
          if (err) throw err;
        });
        fs.promises.copyFile(
          path.join(sourse, file.name),
          path.join(destin, file.name),
        );
      }
    });
  });
}
dirCopyInAssets(assetsFolderCopy, projectAssetsFolder);
