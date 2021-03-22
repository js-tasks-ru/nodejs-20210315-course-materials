const {createReadStream} = require('fs');
const path = require('path');

const FILE_NAME = path.resolve(process.cwd(), './data/3-law.txt');

const READ_SIZE = 2 ** 14;

const readStream = createReadStream(FILE_NAME, {highWaterMark: 2 ** 16}); // 64kb

let totalSize = 0;

readStream.on('readable', function () {
  let chunk = readStream.read(/*READ_SIZE*/);
  while (null !== chunk) {
    console.log(`Received ${chunk.length} bytes of data.`);
    totalSize += chunk.length;
    chunk = readStream.read(/*READ_SIZE*/);
  }
});

readStream.once('end', () => {
  console.log(`Total size: ${totalSize}`);
});

readStream.once('close', () => {
  console.log("Stream closed");
});


