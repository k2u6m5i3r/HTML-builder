var fs = require('fs');
const path = require('path');

var data = '';

var readerStream = fs.createReadStream(
  path.join(__dirname, '/text.txt'),
  'utf-8',
);
readerStream.on('data', (chunk) => {
  data += chunk;
});

readerStream.on('end', () => {
  console.log(data);
});

readerStream.on('error', (err) => {
  console.log(err.stack);
});
