var fs = require('fs');
const path = require('path');
var process = require('process');

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
process.stdout.write('Your text\n');
process.stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    sayBye();
  }
  output.write(data);
});

process.on('SIGINT', sayBye);

function sayBye() {
  process.stdout.write('\ntext saved to file: text.txt');
  process.exit();
}
