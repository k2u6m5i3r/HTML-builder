var fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(path.join(__dirname, 'files-copy'), (err, items) => {
  for (let i = 0; i < items.length; i++) {
    fs.unlink(path.join(__dirname, 'files-copy', items[i]), (err) => {
      if (err) throw err; // не удалось удалить файл
      //console.log('Файл успешно удалён');
    });
  }
});

fs.readdir(path.join(__dirname, 'files'), (err, items) => {
  for (let i = 0; i < items.length; i++) {
    // console.log("source- ", items[i]);
    fs.copyFile(
      path.join(__dirname, 'files', items[i]),
      path.join(__dirname, 'files-copy', items[i]),
      (err) => {
        if (err) throw err; // не удалось скопировать файл
      },
    );
  }
});
